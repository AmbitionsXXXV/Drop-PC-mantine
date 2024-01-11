import { ActionToggle } from '@/components/ActionToggle/ActionToggle'
import OrgSelect from '@/components/OrgSelect'
import { useGoTo, useIsOrgRoute } from '@/hooks'
import { ROUTE_KEY } from '@/routes/menu'
import { ShopOutlined } from '@ant-design/icons'
import { AppShell, Burger, Group, Space, Text, Tooltip } from '@mantine/core'
import type { FC } from 'react'
import classes from './MainHeader.module.css'

interface IMainHeaderProps {
  collapsed: boolean
  toggleCollapsed: (value?: React.SetStateAction<boolean> | undefined) => void
}

const { Header } = AppShell

const MainHeader: FC<IMainHeaderProps> = ({ collapsed, toggleCollapsed }) => {
  const { go } = useGoTo()
  const isOrg = useIsOrgRoute()

  const goToOrg = () => {
    go(ROUTE_KEY.ORG)
  }

  return (
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

          <Space h="100%">
            <ActionToggle />
          </Space>
        </Group>
      </Group>
    </Header>
  )
}

export default MainHeader
