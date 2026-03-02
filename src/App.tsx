import { useEffect, useEffectEvent } from 'react'
import { Feed } from './components/Feed'
import { Toast } from './components/Toast'
import { seedPosts } from './data/gifs'
import { SavedGifsProvider } from './context/SavedGifsContext'
import { ToastProvider } from './context/ToastContext'
import { useSavedGifs } from './context/useSavedGifs'
import { useToast } from './context/useToast'

function AppContent() {
  const { hydrationError, savedGifs } = useSavedGifs()
  const { dismissToast, showToast, toast } = useToast()
  const notifyHydrationError = useEffectEvent(() => {
    showToast('Could not load saved GIFs', 'error')
  })

  useEffect(() => {
    if (hydrationError) {
      notifyHydrationError()
    }
  }, [hydrationError])

  return (
    <div className="min-h-screen bg-[var(--app-background)] text-[var(--app-text)]">
      <header className="sticky top-0 z-30 border-b border-[var(--card-border)] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-15 max-w-[975px] items-center justify-between px-4 sm:px-6">
          <div className='font-["Snell_Roundhand","Segoe_Script",cursive] text-3xl leading-none text-slate-950'>
            Social
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-[var(--card-border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--meta-text)] sm:flex">
              <span className="text-[var(--app-text)]">My GIFs</span>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[11px] text-white">
                {savedGifs.length}
              </span>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--card-border)] bg-white text-xs font-semibold text-slate-700">
              SG
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex min-h-[calc(100vh-3.75rem)] max-w-[975px] flex-col">
        <main className="mx-auto w-full max-w-[470px] pb-18 pt-3 sm:pt-8">
          <div className="mb-4 px-4 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--meta-text)] sm:hidden">
            My GIFs: {savedGifs.length}
          </div>
          <Feed posts={seedPosts} />
        </main>
      </div>

      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  )
}

function App() {
  return (
    <ToastProvider>
      <SavedGifsProvider>
        <AppContent />
      </SavedGifsProvider>
    </ToastProvider>
  )
}

export default App
