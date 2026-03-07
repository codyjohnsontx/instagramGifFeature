import { Feed } from './features/feed/components/Feed'
import { useFeed } from './features/feed/hooks/useFeed'
import { useSavedGifs } from './features/gif-library/context/SavedGifsContext'
import { useToast } from './shared/context/ToastContext'
import { CameraIcon, HeartIcon, MessagesIcon } from './shared/ui/Icons'
import { Sidebar } from './shared/ui/Sidebar'
import { StoriesBar } from './shared/ui/StoriesBar'
import { Toast } from './shared/ui/Toast'

function AppContent() {
  const { data, isPending } = useFeed()
  const { dismissToast, toast } = useToast()
  const { resolvedEntries } = useSavedGifs()

  if (isPending || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--app-background)] text-[var(--app-text)]">
        Loading feed...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--app-background)] text-[var(--app-text)]">
      <header className="sticky top-0 z-30 border-b border-[#262626] bg-black/95 backdrop-blur lg:hidden">
        <div className="mx-auto flex h-14 max-w-[640px] items-center justify-between px-4">
          <button className="text-white" type="button">
            <CameraIcon className="h-6 w-6" />
          </button>
          <div className="instagram-wordmark text-white">Instagram</div>
          <div className="flex items-center gap-4 text-white">
            <button aria-label="Notifications" type="button">
              <HeartIcon className="h-6 w-6" />
            </button>
            <button aria-label="Messages" className="relative" type="button">
              <MessagesIcon className="h-6 w-6" />
              {resolvedEntries.length > 0 ? (
                <span className="absolute -right-1 -top-1 rounded-full bg-[#ff3040] px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white">
                  {resolvedEntries.length}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex min-h-screen max-w-[1260px]">
        <Sidebar savedGifCount={resolvedEntries.length} />

        <main className="min-w-0 flex-1 px-0 pb-18 pt-3 lg:px-8 lg:pt-8">
          <div className="mx-auto max-w-[630px]">
            <StoriesBar items={data.stories} />
            <Feed posts={data.posts} />
          </div>
        </main>

        <div className="hidden xl:block xl:w-[320px]" />
      </div>

      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  )
}

export default function App() {
  return <AppContent />
}
