import { ApolloProvider } from '@apollo/client'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Login from './pages/Login/Login.page'
import { ROUTE_COMPONENT } from './routes'
import { routes } from './routes/menu'
import { theme } from './theme'
import { client } from './utils/apollo'

export default function App() {
  return (
    <ApolloProvider client={client}>
      <MantineProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<MainLayout />}>
              {routes.map((item) => {
                const Component = ROUTE_COMPONENT[item.key]
                return <Route path={item.path} key={item.key} element={<Component />} />
              })}
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </ApolloProvider>
  )
}
