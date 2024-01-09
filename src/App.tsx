import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import { ROUTE_COMPONENT } from './routes'
import { routes } from './routes/menu'
import { theme } from './theme'

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<div>login</div>} />

          <Route path="/" element={<MainLayout />}>
            {routes.map((item) => {
              const Component = ROUTE_COMPONENT[item.key]
              return <Route path={item.path} key={item.key} element={<Component />} />
            })}
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}
