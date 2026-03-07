export const dataMode = import.meta.env.VITE_DATA_MODE === 'api' ? 'api' : 'mock'

export function isApiMode() {
  return dataMode === 'api'
}
