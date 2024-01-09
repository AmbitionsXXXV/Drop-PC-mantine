import NavLinks from '@/components/NavLinks'
import OrgSelect from '@/components/OrgSelect'
import { useGoTo, useIsOrgRoute } from '@/hooks'
import { useUserContext } from '@/hooks/userHooks'
import { ROUTE_KEY, routes } from '@/routes/menu'
import { AUTH_TOKEN } from '@/utils/constants'
import { LogoutOutlined, ShopOutlined } from '@ant-design/icons'
import {
  AppShell,
  Burger,
  Divider,
  Group,
  ScrollArea,
  Space,
  Text,
  Tooltip
} from '@mantine/core'
import { useToggle } from '@mantine/hooks'
import type { FC } from 'react'
import { useNavigate, useOutlet } from 'react-router-dom'
import classes from './main-layout.module.css'

const { Header, Main, Navbar, Section } = AppShell

const MainLayout: FC = () => {
  const [collapsed, toggleCollapsed] = useToggle([true, false])
  const outlet = useOutlet()
  const { store } = useUserContext()
  const isOrg = useIsOrgRoute()
  const { go } = useGoTo()
  const nav = useNavigate()

  const logoutHandler = () => {
    sessionStorage.setItem(AUTH_TOKEN, '')
    localStorage.setItem(AUTH_TOKEN, '')

    nav('/login')
  }

  const goToOrg = () => {
    go(ROUTE_KEY.ORG)
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
        <Header data-tauri-drag-region p="md" className={classes.header}>
          <Group h="100%" justify="space-between" className="w-full">
            <Group>
              <Burger
                size="sm"
                hiddenFrom="sm"
                opened={collapsed}
                onClick={() => toggleCollapsed()}
              />

              <Burger
                size="sm"
                visibleFrom="sm"
                opened={collapsed}
                onClick={() => toggleCollapsed()}
              />

              <Text>Header Title</Text>
            </Group>

            <Group h="100%">
              {!isOrg && <OrgSelect />}

              <Tooltip label="门店管理">
                <ShopOutlined onClick={goToOrg} />
              </Tooltip>
            </Group>
          </Group>
        </Header>

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
