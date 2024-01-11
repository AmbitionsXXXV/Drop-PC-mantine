import { LOGIN, SEND_CODE_MSG } from '@/graphql/auth'
import { useUserContext } from '@/hooks/userHooks'
import { AUTH_TOKEN } from '@/utils/constants'
import { msgCodeLoginFormSchema } from '@/utils/resolver'
import { useMutation } from '@apollo/client'
import { Button, Checkbox, Paper, TextInput, Title } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useDocumentTitle } from '@mantine/hooks'
import { useEffect, useRef, useState, type FC } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import classes from './Login.module.css'

const Login: FC = () => {
  useDocumentTitle('登录')
  const { store } = useUserContext()
  const [params] = useSearchParams()
  const nav = useNavigate()
  const [run] = useMutation(SEND_CODE_MSG)
  const [login] = useMutation(LOGIN)
  const [count, setCount] = useState(5)
  const [disabled, setDisabled] = useState(false)
  const timerRef = useRef<number | null>(null)
  const form = useForm({
    initialValues: {
      tel: '18258145396',
      code: '',
      autoLogin: true
    },
    validate: zodResolver(msgCodeLoginFormSchema)
  })

  const loginHandler = async (variables: {
    tel: string
    code: string
    autoLogin: boolean
  }) => {
    const res = await login({ variables })

    if (res.data.login.code === 200) {
      store.refetchHandler?.()

      if (variables.autoLogin) {
        sessionStorage.setItem(AUTH_TOKEN, '')
        localStorage.setItem(AUTH_TOKEN, res.data.login.data)
      } else {
        localStorage.setItem(AUTH_TOKEN, '')
        sessionStorage.setItem(AUTH_TOKEN, res.data.login.data)
      }

      toast.success(res.data.login.message)
      nav(params.get('orgUrl') || '/')

      return
    }
    toast.error(res.data.login.message)
  }

  // 获取短信验证码的缓冲
  const countDown = () => {
    timerRef.current = window.setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 1) {
          clearInterval(timerRef.current!)
          setDisabled(false)
          setCount(5)
        }

        return prevCount - 1
      })
    }, 1000)
  }

  useEffect(() => {
    if (disabled) {
      countDown()
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [disabled])

  return (
    <div className={classes.wrapper}>
      <Toaster richColors position="top-center" />

      <Paper p={30} radius={0} className={classes.form}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to Drop Class!
        </Title>

        <form onSubmit={form.onSubmit(loginHandler)}>
          <TextInput
            required
            size="md"
            label="手机号"
            placeholder="+86 "
            {...form.getInputProps('tel')}
          />

          <TextInput
            required
            mt="md"
            size="md"
            label="密码"
            placeholder="请输入密码"
            rightSectionWidth={disabled ? 130 : 115}
            rightSection={
              <Button
                disabled={disabled}
                onClick={async () => {
                  const res = await run({
                    variables: { tel: form.getInputProps('tel').value }
                  })

                  if (res.data.sendCodeMsg.code === 200) {
                    toast.success(res.data.sendCodeMsg.message)
                  } else {
                    toast.error(res.data.sendCodeMsg.message)
                  }

                  setDisabled(true)
                }}
              >
                {disabled ? `${count}` : ''}获取验证码
              </Button>
            }
            {...form.getInputProps('code')}
          />

          <Checkbox
            mt="xl"
            size="md"
            label="自动登陆"
            {...form.getInputProps('autoLogin', { type: 'checkbox' })}
          />

          <Button fullWidth mt="xl" size="md" type="submit">
            Login
          </Button>

          <Button onClick={() => toast.success('111')}>111</Button>
        </form>
      </Paper>
    </div>
  )
}

export default Login
