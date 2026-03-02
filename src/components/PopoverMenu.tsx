import { type RefObject, useEffect, useRef } from 'react'

export type PopoverAction = {
  label: string
  onSelect: () => void
  destructive?: boolean
}

type PopoverMenuProps = {
  open: boolean
  anchorRef: RefObject<HTMLElement | null>
  onClose: () => void
  actions: PopoverAction[]
}

export function PopoverMenu({
  open,
  anchorRef,
  onClose,
  actions,
}: PopoverMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) {
      return undefined
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node

      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        anchorRef.current &&
        !anchorRef.current.contains(target)
      ) {
        onClose()
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [anchorRef, onClose, open])

  if (!open) {
    return null
  }

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-8 z-20 min-w-40 overflow-hidden rounded-lg border border-[var(--card-border)] bg-white py-1 shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
      role="menu"
    >
      {actions.map((action) => (
        <button
          key={action.label}
          className={`flex w-full items-center px-3 py-2 text-left text-sm transition hover:bg-slate-50 ${
            action.destructive ? 'text-rose-600' : 'text-[var(--thread-text)]'
          }`}
          role="menuitem"
          type="button"
          onClick={() => {
            action.onSelect()
            onClose()
          }}
        >
          {action.label}
        </button>
      ))}
    </div>
  )
}
