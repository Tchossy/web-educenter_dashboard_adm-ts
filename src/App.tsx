import { AppProvider } from './provider/AppProvider'
import { Router } from './routes/Routes'

export function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  )
}
