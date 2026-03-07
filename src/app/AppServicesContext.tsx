import { createContext, useContext, type PropsWithChildren } from 'react'
import type { AppServices } from './services'

const AppServicesContext = createContext<AppServices | undefined>(undefined)

export function AppServicesProvider({
  children,
  services,
}: PropsWithChildren<{ services: AppServices }>) {
  return (
    <AppServicesContext.Provider value={services}>
      {children}
    </AppServicesContext.Provider>
  )
}

export function useAppServices() {
  const context = useContext(AppServicesContext)

  if (!context) {
    throw new Error('useAppServices must be used within AppServicesProvider')
  }

  return context
}
