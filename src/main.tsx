import { MantineProvider } from '@mantine/core'
import 'dayjs/locale/zh-cn'
import ReactDOM from 'react-dom/client'
import App from './App'
import './global.css'
import { theme } from './theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider theme={theme}>
    <App />
  </MantineProvider>
)
