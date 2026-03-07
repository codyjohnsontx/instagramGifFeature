import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import type { PropsWithChildren, ReactElement } from 'react'
import { AppServicesProvider } from '../app/AppServicesContext'
import { createServices } from '../app/createServices'
import type { AppServices } from '../app/services'
import { SavedGifsProvider } from '../features/gif-library/context/SavedGifsContext'
import { ToastProvider } from '../shared/context/ToastContext'
import { createAppQueryClient } from '../shared/lib/queryClient'

export function renderWithProviders(
  ui: ReactElement,
  options?: {
    mode?: 'api' | 'mock'
    services?: AppServices
  },
) {
  const queryClient = createAppQueryClient()
  const services = options?.services ?? createServices(options?.mode ?? 'mock')

  function Wrapper({ children }: PropsWithChildren) {
    return (
      <QueryClientProvider client={queryClient}>
        <AppServicesProvider services={services}>
          <ToastProvider>
            <SavedGifsProvider>{children}</SavedGifsProvider>
          </ToastProvider>
        </AppServicesProvider>
      </QueryClientProvider>
    )
  }

  return render(ui, { wrapper: Wrapper })
}
