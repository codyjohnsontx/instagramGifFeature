import {
  createContext,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
  type PropsWithChildren,
} from 'react'
import type { ToastMessage } from '../../types'

type ToastTone = ToastMessage['tone']

type ToastContextValue = {
  toast: ToastMessage | null
  showToast: (message: string, tone?: ToastTone) => void
  dismissToast: () => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

function createToastId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `toast-${Date.now()}-${Math.round(Math.random() * 1000)}`
}

export function ToastProvider({ children }: PropsWithChildren) {
  const [toast, setToast] = useState<ToastMessage | null>(null)
  const dismissWithLatestState = useEffectEvent(() => {
    setToast(null)
  })

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
    <ToastContext.Provider
      value={{
        toast,
        showToast: (message, tone = 'default') => {
          setToast({ id: createToastId(), message, tone })
        },
        dismissToast: () => {
          setToast(null)
        },
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }

  return context
}
