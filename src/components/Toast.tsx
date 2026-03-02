import type { ToastMessage } from '../types'

type ToastProps = {
  toast: ToastMessage | null
  onDismiss: () => void
}

export function Toast({ toast, onDismiss }: ToastProps) {
  if (!toast) {
    return null
  }

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-5 z-50 flex justify-center sm:inset-x-0"
    >
      <div
        className={`pointer-events-auto flex items-center gap-3 rounded-md border px-3 py-2 text-sm font-medium shadow-[0_8px_20px_rgba(0,0,0,0.18)] ${
          toast.tone === 'error'
            ? 'border-rose-200 bg-rose-50 text-rose-700'
            : 'border-[#363636] bg-[#262626] text-white'
        }`}
      >
        <span>{toast.message}</span>
        <button
          aria-label="Dismiss toast"
          className={`rounded-sm px-1.5 py-0.5 text-[11px] ${
            toast.tone === 'error'
              ? 'bg-rose-100 text-rose-700'
              : 'bg-white/10 text-white'
          }`}
          type="button"
          onClick={onDismiss}
        >
          ×
        </button>
      </div>
    </div>
  )
}
