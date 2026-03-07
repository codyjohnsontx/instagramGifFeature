import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App'
import { AppServicesProvider } from './app/AppServicesContext'
import { createServices } from './app/createServices'
import { SavedGifsProvider } from './features/gif-library/context/SavedGifsContext'
import { createAppQueryClient } from './shared/lib/queryClient'
import { dataMode } from './shared/lib/env'
import { ToastProvider } from './shared/context/ToastContext'

const queryClient = createAppQueryClient()
const services = createServices(dataMode)

async function enableApiMocks() {
  if (!import.meta.env.DEV || dataMode !== 'api') {
    return
  }

  const { worker } = await import('./mocks/api/browser')
  await worker.start({
    onUnhandledRequest: 'bypass',
  })
}

void enableApiMocks().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AppServicesProvider services={services}>
          <ToastProvider>
            <SavedGifsProvider>
              <App />
            </SavedGifsProvider>
          </ToastProvider>
        </AppServicesProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
})
