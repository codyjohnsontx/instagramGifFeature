import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type RefObject,
} from 'react'
import type { GifAsset, GifPickerTab } from '../../../types'
import { useSavedGifs } from '../context/SavedGifsContext'
import { useGifSearch } from '../hooks/useGifSearch'
import { useToast } from '../../../shared/context/ToastContext'
import { GifImage } from '../../../shared/ui/GifImage'
import { BookmarkIcon, CloseIcon } from '../../../shared/ui/Icons'

type GifPickerProps = {
  activeTab: GifPickerTab
  selectedGifId?: string
  searchQuery: string
  triggerRef: RefObject<HTMLButtonElement | null>
  onClose: () => void
  onTabChange: (tab: GifPickerTab) => void
  onSearchQueryChange: (query: string) => void
  onSelectGif: (gif: GifAsset) => void
}

function moveGridFocus(
  event: ReactKeyboardEvent<HTMLButtonElement>,
  index: number,
  refs: Array<HTMLButtonElement | null>,
) {
  const columns = window.innerWidth >= 640 ? 4 : 3
  let nextIndex = index

  if (event.key === 'ArrowRight') {
    nextIndex = Math.min(index + 1, refs.length - 1)
  } else if (event.key === 'ArrowLeft') {
    nextIndex = Math.max(index - 1, 0)
  } else if (event.key === 'ArrowDown') {
    nextIndex = Math.min(index + columns, refs.length - 1)
  } else if (event.key === 'ArrowUp') {
    nextIndex = Math.max(index - columns, 0)
  } else {
    return
  }

  event.preventDefault()
  refs[nextIndex]?.focus()
}

function GifTile({
  gif,
  selected,
  saved,
  moveOptions,
  onMove,
  onSelect,
  onToggleSave,
  setButtonRef,
  onKeyDown,
}: {
  gif: GifAsset
  selected: boolean
  saved?: boolean
  moveOptions?: Array<{ id: string; name: string }>
  onMove?: (toCollectionId: string) => void
  onSelect: () => void
  onToggleSave: () => void
  setButtonRef: (element: HTMLButtonElement | null) => void
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void
}) {
  return (
    <div className="group relative">
      <button
        ref={setButtonRef}
        className={`w-full overflow-hidden rounded-xl border bg-[#0f0f0f] text-left transition ${
          selected ? 'border-white' : 'border-[var(--card-border)]'
        }`}
        type="button"
        onClick={onSelect}
        onKeyDown={onKeyDown}
      >
        <GifImage
          alt={gif.title}
          className="aspect-square w-full object-cover"
          placeholderClassName="aspect-square w-full rounded-none border-0 bg-slate-100 text-[11px] text-[var(--meta-text)]"
          src={gif.previewUrl}
        />
        <div className="border-t border-[#262626] px-2.5 py-2">
          <p className="line-clamp-1 text-[11px] font-medium text-[var(--thread-text)]">
            {gif.title}
          </p>
        </div>
      </button>
      <button
        aria-label={
          saved ? `Remove ${gif.title} from selected folder` : `Save ${gif.title} to selected folder`
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
      {moveOptions && onMove ? (
        <label className="absolute bottom-2 left-2 right-2 rounded-lg bg-black/75 px-2 py-1 text-[10px] text-white sm:opacity-0 sm:transition sm:group-hover:opacity-100">
          <span className="mr-1.5">Move</span>
          <select
            aria-label={`Move ${gif.title} to folder`}
            className="max-w-full bg-transparent text-[10px] outline-none"
            defaultValue=""
            onClick={(event) => {
              event.stopPropagation()
            }}
            onChange={(event) => {
              event.stopPropagation()
              if (event.target.value) {
                onMove(event.target.value)
                event.target.value = ''
              }
            }}
          >
            <option value="">Select</option>
            {moveOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </label>
      ) : null}
    </div>
  )
}

function trapFocus(event: KeyboardEvent, dialog: HTMLElement) {
  if (event.key !== 'Tab') {
    return
  }

  const focusable = Array.from(
    dialog.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  )

  if (focusable.length === 0) {
    return
  }

  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

export function GifPicker({
  activeTab,
  selectedGifId,
  searchQuery,
  triggerRef,
  onClose,
  onTabChange,
  onSearchQueryChange,
  onSelectGif,
}: GifPickerProps) {
  const {
    activeCollectionId,
    collections,
    entriesForActiveCollection,
    isSaved,
    moveGif,
    removeGif,
    saveGif,
    saveTargetCollectionId,
    setActiveCollectionId,
    setSaveTargetCollectionId,
    createCollection,
  } = useSavedGifs()
  const { showToast } = useToast()
  const { data } = useGifSearch(searchQuery)
  const [createFolderOpen, setCreateFolderOpen] = useState(false)
  const [folderName, setFolderName] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const tileRefs = useRef<Array<HTMLButtonElement | null>>([])

  const filteredCatalog = data?.items ?? []
  const savedEntries = entriesForActiveCollection
  const displayedItems = activeTab === 'search' ? filteredCatalog : savedEntries.map((entry) => entry.gif)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) {
      return undefined
    }
    const triggerElement = triggerRef.current

    const focusTarget =
      activeTab === 'search' ? searchInputRef.current : closeButtonRef.current
    focusTarget?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      trapFocus(event, dialog)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      triggerElement?.focus()
    }
  }, [activeTab, onClose, triggerRef])

  const handleToggleSave = async (gif: GifAsset) => {
    try {
      const isSavedInTarget = isSaved(gif.id, saveTargetCollectionId)

      if (isSavedInTarget) {
        await removeGif({ gifId: gif.id, collectionId: saveTargetCollectionId })
        showToast('Removed from folder')
        return
      }

      await saveGif({ gifId: gif.id, collectionId: saveTargetCollectionId })
      showToast('Saved to folder')
    } catch {
      showToast('Could not update that folder', 'error')
    }
  }

  const handleMove = async (gifId: string, fromCollectionId: string, toCollectionId: string) => {
    try {
      await moveGif({ gifId, fromCollectionId, toCollectionId })
      showToast('Moved to folder')
    } catch {
      showToast('Could not move GIF', 'error')
    }
  }

  const handleCreateFolder = async () => {
    try {
      const collection = await createCollection(folderName)
      setFolderName('')
      setCreateFolderOpen(false)
      setActiveCollectionId(collection.id)
      setSaveTargetCollectionId(collection.id)
      showToast(`Created ${collection.name}`)
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : 'Could not create folder',
        'error',
      )
    }
  }

  return (
    <>
      <button
        aria-label="Close GIF picker backdrop"
        className="fixed inset-0 z-30 bg-[var(--sheet-backdrop)]"
        tabIndex={-1}
        type="button"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        aria-label="Choose a GIF"
        aria-modal="true"
        className="fixed inset-x-0 bottom-0 z-40 max-h-[82vh] rounded-t-3xl border-t border-[#262626] bg-[var(--sheet-surface)] shadow-[0_-12px_32px_rgba(0,0,0,0.35)] sm:absolute sm:inset-x-0 sm:bottom-[calc(100%+0.75rem)] sm:max-h-[32rem] sm:rounded-2xl sm:border sm:border-[#262626] sm:shadow-[0_12px_24px_rgba(0,0,0,0.32)]"
        role="dialog"
      >
        <div className="border-b border-[#262626] px-4 pb-3 pt-2 sm:pt-3">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#3a3a3a] sm:hidden" />
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-[var(--app-text)]">Choose a GIF</h2>
              <p className="text-xs text-[var(--meta-text)]">
                Search the catalog, save into folders, and reuse from your library.
              </p>
            </div>
            <button
              ref={closeButtonRef}
              aria-label="Close GIF picker"
              className="rounded-full p-1 text-[var(--meta-text)] transition hover:bg-white/8 hover:text-[var(--app-text)]"
              type="button"
              onClick={onClose}
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
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

            <div className="flex items-center gap-2">
              <label className="text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--meta-text)]">
                <span className="mr-2">Save to</span>
                <select
                  aria-label="Save GIFs to folder"
                  className="rounded-lg border border-[#262626] bg-[#0f0f0f] px-2 py-1 text-xs text-[var(--thread-text)]"
                  value={saveTargetCollectionId}
                  onChange={(event) => setSaveTargetCollectionId(event.target.value)}
                >
                  {collections.map((collection) => (
                    <option key={collection.id} value={collection.id}>
                      {collection.name}
                    </option>
                  ))}
                </select>
              </label>
              <button
                className="rounded-full border border-[#363636] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/8"
                type="button"
                onClick={() => setCreateFolderOpen((current) => !current)}
              >
                New folder
              </button>
            </div>
          </div>

          {createFolderOpen ? (
            <div className="mb-3 flex flex-wrap items-center gap-2 rounded-xl border border-[#262626] bg-[#0f0f0f] p-3">
              <input
                aria-label="Folder name"
                className="min-w-50 flex-1 rounded-lg border border-[#262626] bg-black px-3 py-2 text-sm text-[var(--thread-text)] outline-none focus:border-[#3b82f6]"
                placeholder="Folder name"
                type="text"
                value={folderName}
                onChange={(event) => setFolderName(event.target.value)}
              />
              <button
                className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-black disabled:opacity-50"
                disabled={!folderName.trim()}
                type="button"
                onClick={() => {
                  void handleCreateFolder()
                }}
              >
                Create
              </button>
            </div>
          ) : null}

          <div className="subtle-scrollbar flex gap-2 overflow-x-auto">
            {collections.map((collection) => (
              <button
                key={collection.id}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  collection.id === activeCollectionId
                    ? 'border-white bg-white text-black'
                    : 'border-[#363636] text-[var(--thread-text)] hover:bg-white/8'
                }`}
                type="button"
                onClick={() => setActiveCollectionId(collection.id)}
              >
                {collection.name}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          {activeTab === 'search' ? (
            <>
              <label className="mb-3 block">
                <span className="sr-only">Search GIFs</span>
                <input
                  ref={searchInputRef}
                  className="w-full rounded-xl border border-[#262626] bg-[#0f0f0f] px-4 py-2.5 text-sm text-[var(--thread-text)] outline-none transition placeholder:text-[var(--meta-text)] focus:border-[#3b82f6]"
                  placeholder="Search"
                  type="text"
                  value={searchQuery}
                  onChange={(event) => onSearchQueryChange(event.target.value)}
                />
              </label>

              {displayedItems.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#262626] bg-[#0f0f0f] px-4 py-8 text-center text-sm text-[var(--meta-text)]">
                  No GIFs match your search
                </div>
              ) : (
                <div className="subtle-scrollbar grid max-h-[48vh] grid-cols-3 gap-2 overflow-y-auto pr-1 sm:max-h-[17rem] sm:grid-cols-4">
                  {displayedItems.map((gif, index) => (
                    <GifTile
                      key={gif.id}
                      gif={gif}
                      saved={isSaved(gif.id, saveTargetCollectionId)}
                      selected={selectedGifId === gif.id}
                      setButtonRef={(element) => {
                        tileRefs.current[index] = element
                      }}
                      onKeyDown={(event) => moveGridFocus(event, index, tileRefs.current)}
                      onSelect={() => onSelectGif(gif)}
                      onToggleSave={() => {
                        void handleToggleSave(gif)
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          ) : savedEntries.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#262626] bg-[#0f0f0f] px-4 py-8 text-center text-sm text-[var(--meta-text)]">
              This folder is empty. Save GIFs from search or comments to build it up.
            </div>
          ) : (
            <div className="subtle-scrollbar grid max-h-[48vh] grid-cols-3 gap-2 overflow-y-auto pr-1 sm:max-h-[17rem] sm:grid-cols-4">
              {savedEntries.map((entry, index) => (
                <GifTile
                  key={`${entry.record.collectionId}-${entry.gif.id}`}
                  gif={entry.gif}
                  moveOptions={collections
                    .filter((collection) => collection.id !== activeCollectionId)
                    .map((collection) => ({
                      id: collection.id,
                      name: collection.name,
                    }))}
                  saved
                  selected={selectedGifId === entry.gif.id}
                  setButtonRef={(element) => {
                    tileRefs.current[index] = element
                  }}
                  onKeyDown={(event) => moveGridFocus(event, index, tileRefs.current)}
                  onMove={(toCollectionId) => {
                    void handleMove(entry.gif.id, activeCollectionId, toCollectionId)
                  }}
                  onSelect={() => onSelectGif(entry.gif)}
                  onToggleSave={() => {
                    void removeGif({
                      gifId: entry.gif.id,
                      collectionId: activeCollectionId,
                    })
                      .then(() => {
                        showToast('Removed from folder')
                      })
                      .catch(() => {
                        showToast('Could not update that folder', 'error')
                      })
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
