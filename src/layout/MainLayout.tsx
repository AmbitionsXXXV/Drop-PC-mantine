import { Title } from '@mantine/core'
import type { FC } from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout: FC = () => {
  return (
    <>
      <Title className="text-[color:var(--mantine-color-black)]">Main Layout</Title>

      <Outlet />
    </>
  )
}

export default MainLayout
