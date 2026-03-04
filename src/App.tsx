import { useEffect, useEffectEvent } from 'react'
import { Feed } from './components/Feed'
import { CameraIcon, HeartIcon, MessagesIcon } from './components/Icons'
import { Sidebar } from './components/Sidebar'
import { StoriesBar } from './components/StoriesBar'
import { Toast } from './components/Toast'
import { seedPosts, seedStories } from './data/gifs'
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
      <header className="sticky top-0 z-30 border-b border-[#262626] bg-black/95 backdrop-blur lg:hidden">
        <div className="mx-auto flex h-14 max-w-[640px] items-center justify-between px-4">
          <button className="text-white" type="button">
            <CameraIcon className="h-6 w-6" />
          </button>
          <div className="instagram-wordmark text-white">
            Instagram
          </div>
          <div className="flex items-center gap-4 text-white">
            <button aria-label="Notifications" type="button">
              <HeartIcon className="h-6 w-6" />
            </button>
            <button aria-label="Messages" className="relative" type="button">
              <MessagesIcon className="h-6 w-6" />
              {savedGifs.length > 0 ? (
                <span className="absolute -right-1 -top-1 rounded-full bg-[#ff3040] px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white">
                  {savedGifs.length}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex min-h-screen max-w-[1260px]">
        <Sidebar />

        <main className="min-w-0 flex-1 px-0 pb-18 pt-3 lg:px-8 lg:pt-8">
          <div className="mx-auto max-w-[630px]">
            <StoriesBar items={seedStories} />
            <Feed posts={seedPosts} />
          </div>
        </main>

        <div className="hidden xl:block xl:w-[320px]" />
      </div>

      <div className="fixed bottom-6 right-6 z-20 hidden rounded-full border border-[#262626] bg-[#1a1d24] px-5 py-4 shadow-[0_10px_32px_rgba(0,0,0,0.4)] xl:flex xl:items-center xl:gap-4">
        <div className="relative text-white">
          <MessagesIcon className="h-7 w-7" />
          <span className="absolute -right-1 -top-1 rounded-full bg-[#ff3040] px-1.5 py-0.5 text-[11px] font-semibold leading-none text-white">
            9+
          </span>
        </div>
        <div>
          <p className="text-2xl font-semibold text-white">Messages</p>
        </div>
        <div className="flex -space-x-2">
          {seedStories.slice(0, 3).map((story) => (
            <img
              key={story.id}
              alt={story.name}
              className="h-8 w-8 rounded-full border-2 border-[#1a1d24] object-cover"
              src={story.avatarUrl}
            />
          ))}
        </div>
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
