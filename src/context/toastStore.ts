import { createContext } from 'react'
import type { ToastMessage } from '../types'

type ToastTone = ToastMessage['tone']

export type ToastStoreValue = {
  toast: ToastMessage | null
  showToast: (message: string, tone?: ToastTone) => void
  dismissToast: () => void
}

export const toastStore = createContext<ToastStoreValue | undefined>(undefined)
