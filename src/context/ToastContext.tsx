import {
  type PropsWithChildren,
  useEffect,
  useEffectEvent,
  useState,
} from 'react'
import type { ToastMessage } from '../types'
import { toastStore } from './toastStore'

type ToastTone = ToastMessage['tone']

function createToastId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `toast-${Date.now()}-${Math.round(Math.random() * 1000)}`
}

export function ToastProvider({ children }: PropsWithChildren) {
  const [toast, setToast] = useState<ToastMessage | null>(null)
  const dismissToast = () => {
    setToast(null)
  }
  const dismissWithLatestState = useEffectEvent(() => {
    setToast(null)
  })
  const showToast = (message: string, tone: ToastTone = 'default') => {
    setToast({ id: createToastId(), message, tone })
  }

  useEffect(() => {
    if (!toast) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      dismissWithLatestState()
    }, 2500)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [toast])

  return (
    <toastStore.Provider value={{ toast, showToast, dismissToast }}>
      {children}
    </toastStore.Provider>
  )
}
