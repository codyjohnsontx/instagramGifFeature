import { useContext } from 'react'
import { toastStore } from './toastStore'

export function useToast() {
  const context = useContext(toastStore)

  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }

  return context
}
