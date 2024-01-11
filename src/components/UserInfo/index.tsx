import { connect, useGetUser } from '@/hooks/userHooks'
import { IPropChild } from '@/utils/types'
import { Loader, LoadingOverlay, MantineProvider } from '@mantine/core'
import RingLoader from '../RingLoader'

/**
 * 获取用户信息组件
 */
const UserInfo = ({ children }: IPropChild) => {
  const { loading } = useGetUser()

  return (
    <>
      <LoadingOverlay
        visible={loading}
        loaderProps={{
          children: (
            <MantineProvider
              theme={{
                components: {
                  Loader: Loader.extend({
                    defaultProps: {
                      loaders: { ...Loader.defaultLoaders, ring: RingLoader },
                      type: 'ring'
                    }
                  })
                }
              }}
            >
              <Loader />
            </MantineProvider>
          )
        }}
      />

      <div style={{ height: '100vh' }}>{children}</div>
    </>
  )
}

export default connect(UserInfo)
