import { useEffect } from 'react'
import type { GifItem, GifPickerTab, SavedGifItem } from '../types'
import { GifImage } from './GifImage'
import { BookmarkIcon, CloseIcon } from './Icons'

type GifPickerProps = {
  catalog: GifItem[]
  savedGifs: SavedGifItem[]
  isSaved: (gifId: string) => boolean
  activeTab: GifPickerTab
  selectedGifId?: string
  searchQuery: string
  onClose: () => void
  onTabChange: (tab: GifPickerTab) => void
  onSearchQueryChange: (query: string) => void
  onSelectGif: (gif: GifItem) => void
  onToggleSaveGif: (gif: GifItem) => void
}

function GifTile({
  gif,
  selected,
  saved,
  onSelect,
  onToggleSave,
  onRemove,
}: {
  gif: GifItem
  selected: boolean
  saved?: boolean
  onSelect: () => void
  onToggleSave?: () => void
  onRemove?: () => void
}) {
  return (
    <div className="group relative">
      <button
        className={`w-full overflow-hidden rounded-xl border bg-[#0f0f0f] text-left transition ${
          selected ? 'border-white' : 'border-[var(--card-border)]'
        }`}
        type="button"
        onClick={onSelect}
      >
        <GifImage
          alt={gif.title}
          className="aspect-square w-full object-cover"
          placeholderClassName="aspect-square w-full rounded-none border-0 bg-slate-100 text-[11px] text-[var(--meta-text)]"
          src={gif.previewUrl ?? gif.url}
        />
        <div className="border-t border-[#262626] px-2.5 py-2">
          <p className="line-clamp-1 text-[11px] font-medium text-[var(--thread-text)]">
            {gif.title}
          </p>
        </div>
      </button>
      {onToggleSave ? (
        <button
          aria-label={
            saved
              ? `Remove ${gif.title} from My GIFs`
              : `Save ${gif.title} to My GIFs`
          }
          className={`absolute left-2 top-2 rounded-full border p-1 text-white transition ${
            saved
              ? 'border-[#3b82f6] bg-[#1d4ed8]'
              : 'border-white/30 bg-black/60 hover:bg-black/75'
          }`}
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onToggleSave()
          }}
        >
          <BookmarkIcon className="h-3.5 w-3.5" filled={Boolean(saved)} />
        </button>
      ) : null}
      {onRemove ? (
        <button
          aria-label={`Remove ${gif.title} from My GIFs`}
          className="absolute right-2 top-2 rounded-full bg-black/75 px-1.5 py-1 text-[10px] font-semibold text-white sm:opacity-0 sm:group-hover:opacity-100"
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onRemove()
          }}
        >
          ×
        </button>
      ) : null}
    </div>
  )
}

export function GifPicker({
  catalog,
  savedGifs,
  isSaved,
  activeTab,
  selectedGifId,
  searchQuery,
  onClose,
  onTabChange,
  onSearchQueryChange,
  onSelectGif,
  onToggleSaveGif,
}: GifPickerProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const filteredCatalog = catalog.filter((gif) =>
    gif.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  )

  return (
    <>
      <button
        aria-label="Close GIF picker backdrop"
        className="fixed inset-0 z-30 bg-[var(--sheet-backdrop)]"
        type="button"
        onClick={onClose}
      />
      <div
        aria-label="Choose a GIF"
        aria-modal="true"
        className="fixed inset-x-0 bottom-0 z-40 max-h-[78vh] rounded-t-3xl border-t border-[#262626] bg-[var(--sheet-surface)] shadow-[0_-12px_32px_rgba(0,0,0,0.35)] sm:absolute sm:inset-x-0 sm:bottom-[calc(100%+0.75rem)] sm:max-h-[27rem] sm:rounded-2xl sm:border sm:border-[#262626] sm:shadow-[0_12px_24px_rgba(0,0,0,0.32)]"
        role="dialog"
      >
        <div className="border-b border-[#262626] px-4 pb-3 pt-2 sm:pt-3">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#3a3a3a] sm:hidden" />
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-[var(--app-text)]">Choose a GIF</h2>
              <p className="text-xs text-[var(--meta-text)]">
                Search the catalog or pick from My GIFs
              </p>
            </div>
            <button
              aria-label="Close GIF picker"
              className="rounded-full p-1 text-[var(--meta-text)] transition hover:bg-white/8 hover:text-[var(--app-text)]"
              type="button"
              onClick={onClose}
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex rounded-lg bg-[#1c1c1c] p-1">
              <button
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  activeTab === 'search'
                    ? 'bg-[#2f2f2f] text-[var(--app-text)]'
                    : 'text-[var(--meta-text)]'
                }`}
                type="button"
                onClick={() => onTabChange('search')}
              >
                GIF Search
              </button>
              <button
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  activeTab === 'saved'
                    ? 'bg-[#2f2f2f] text-[var(--app-text)]'
                    : 'text-[var(--meta-text)]'
                }`}
                type="button"
                onClick={() => onTabChange('saved')}
              >
                My GIFs
              </button>
            </div>
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--meta-text)]">
              {activeTab === 'search'
                ? `${filteredCatalog.length} results`
                : `${savedGifs.length} saved`}
            </p>
          </div>
        </div>

        <div className="p-4">
          {activeTab === 'search' ? (
            <>
              <label className="mb-3 block">
                <span className="sr-only">Search GIFs</span>
                <input
                  className="w-full rounded-xl border border-[#262626] bg-[#0f0f0f] px-4 py-2.5 text-sm text-[var(--thread-text)] outline-none transition placeholder:text-[var(--meta-text)] focus:border-[#3b82f6]"
                  placeholder="Search"
                  type="text"
                  value={searchQuery}
                  onChange={(event) => onSearchQueryChange(event.target.value)}
                />
              </label>

              {filteredCatalog.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#262626] bg-[#0f0f0f] px-4 py-8 text-center text-sm text-[var(--meta-text)]">
                  No GIFs match your search
                </div>
              ) : (
                <div className="subtle-scrollbar grid max-h-[48vh] grid-cols-3 gap-2 overflow-y-auto pr-1 sm:max-h-[15rem] sm:grid-cols-4">
                  {filteredCatalog.map((gif) => (
                    <GifTile
                      key={gif.id}
                      gif={gif}
                      saved={isSaved(gif.id)}
                      selected={selectedGifId === gif.id}
                      onSelect={() => onSelectGif(gif)}
                      onToggleSave={() => onToggleSaveGif(gif)}
                    />
                  ))}
                </div>
              )}
            </>
          ) : savedGifs.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#262626] bg-[#0f0f0f] px-4 py-8 text-center text-sm text-[var(--meta-text)]">
              Save GIFs you find in comments to reuse them here
            </div>
          ) : (
            <div className="subtle-scrollbar grid max-h-[48vh] grid-cols-3 gap-2 overflow-y-auto pr-1 sm:max-h-[15rem] sm:grid-cols-4">
              {savedGifs.map((gif) => (
                <GifTile
                  key={gif.id}
                  gif={gif}
                  saved
                  selected={selectedGifId === gif.id}
                  onRemove={() => onToggleSaveGif(gif)}
                  onSelect={() => onSelectGif(gif)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
