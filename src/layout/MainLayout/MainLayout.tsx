import { NavbarNested } from '@/components/NavbarNested/NavbarNested'
import { useUserContext } from '@/hooks/userHooks'
import { AppShell } from '@mantine/core'
import { useToggle } from '@mantine/hooks'
import type { FC } from 'react'
import { useOutlet } from 'react-router-dom'
import MainHeader from '../MainHeader/MainHeader'
import classes from './main-layout.module.css'

const { Main } = AppShell

const MainLayout: FC = () => {
  const [collapsed, toggleCollapsed] = useToggle([true, false])
  const outlet = useOutlet()
  const { store } = useUserContext()

  return (
    <>
      <AppShell
        padding="md"
        header={{ height: 60 }}
        className={classes.appShell}
        navbar={{
          width: 300,
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

        <NavbarNested />

        <Main className={classes.appMain}>
          <div key={store.currentOrg}>{outlet}</div>
        </Main>
      </AppShell>
    </>
  )
}

export default MainLayout
