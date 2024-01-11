import NavLinks from '@/components/NavLinks'
import { useUserContext } from '@/hooks/userHooks'
import { routes } from '@/routes/menu'
import { AUTH_TOKEN } from '@/utils/constants'
import { LogoutOutlined } from '@ant-design/icons'
import { AppShell, Divider, ScrollArea, Space } from '@mantine/core'
import { useToggle } from '@mantine/hooks'
import type { FC } from 'react'
import { useNavigate, useOutlet } from 'react-router-dom'
import MainHeader from '../MainHeader/MainHeader'
import classes from './main-layout.module.css'

const { Main, Navbar, Section } = AppShell

const MainLayout: FC = () => {
  const [collapsed, toggleCollapsed] = useToggle([true, false])
  const outlet = useOutlet()
  const { store } = useUserContext()
  const nav = useNavigate()

  const logoutHandler = () => {
    sessionStorage.setItem(AUTH_TOKEN, '')
    localStorage.setItem(AUTH_TOKEN, '')

    nav('/login')
  }

  return (
    <>
      <AppShell
        padding="md"
        header={{ height: 60 }}
        className={classes.appShell}
        navbar={{
          width: 200,
          breakpoint: 'sm',
          collapsed: { desktop: !collapsed }
        }}
        aside={{
          breakpoint: 'sm',
          width: { sm: 200, lg: 300 },
          collapsed: { desktop: false }
        }}
      >
        <MainHeader collapsed={collapsed} toggleCollapsed={toggleCollapsed} />

        <Navbar p="xs">
          <Section grow component={ScrollArea}>
            <NavLinks views={routes} toggleCollapsed={toggleCollapsed} />
          </Section>

          <Section className="pb-1">
            <Divider />
          </Section>

          <Section>
            <Space
              h={28}
              onClick={logoutHandler}
              className="w-full flex gap-3 justify-center items-center cursor-pointer hover:bg-slate-100"
            >
              <LogoutOutlined size={14} />
              退出
            </Space>
          </Section>
        </Navbar>

        <Main className={classes.appMain}>
          <div key={store.currentOrg}>{outlet}</div>
        </Main>
      </AppShell>
    </>
  )
}

export default MainLayout
