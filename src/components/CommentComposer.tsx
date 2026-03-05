import { useState } from 'react'
import { seedGifCatalog } from '../data/gifs'
import { useSavedGifs } from '../context/useSavedGifs'
import { useToast } from '../context/useToast'
import type { CommentDraft, GifItem, GifPickerTab } from '../types'
import { GifImage } from './GifImage'
import { GifPicker } from './GifPicker'
import { CloseIcon, SmileIcon } from './Icons'

type CommentComposerProps = {
  onPost: (draft: CommentDraft) => void
}

export function CommentComposer({ onPost }: CommentComposerProps) {
  const { isSaved, removeGif, saveGif, savedGifs } = useSavedGifs()
  const { showToast } = useToast()
  const [text, setText] = useState('')
  const [selectedGif, setSelectedGif] = useState<GifItem | undefined>()
  const [pickerOpen, setPickerOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<GifPickerTab>('search')
  const [searchQuery, setSearchQuery] = useState('')

  const hasDraft = text.trim().length > 0 || Boolean(selectedGif)

  const handlePost = () => {
    const trimmedText = text.trim()

    if (!trimmedText && !selectedGif) {
      return
    }

    onPost({
      text: trimmedText || undefined,
      gif: selectedGif,
    })

    setText('')
    setSelectedGif(undefined)
    setSearchQuery('')
    setActiveTab('search')
    setPickerOpen(false)
  }

  const handleToggleSaveGif = (gif: GifItem) => {
    if (isSaved(gif.id)) {
      if (removeGif(gif.id)) {
        showToast('Removed from My GIFs')
      }
      return
    }

    const result = saveGif(gif)

    if (!result.saved) {
      return
    }

    if (result.removedOldest) {
      showToast('Library full, removed oldest GIF')
      return
    }

    showToast('Saved to My GIFs')
  }

  return (
    <div className="relative">
      {selectedGif ? (
        <div className="mb-2 flex items-center gap-3 rounded-xl bg-[#121212] px-3 py-2">
          <div className="h-11 w-11 overflow-hidden rounded-lg border border-[#262626]">
            <GifImage
              alt={selectedGif.title}
              className="h-full w-full object-cover"
              placeholderClassName="h-full min-h-0 w-full rounded-none border-0 bg-[#181818] px-2 py-3 text-[10px] text-[var(--meta-text)]"
              src={selectedGif.previewUrl ?? selectedGif.url}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--meta-text)]">
              Selected GIF
            </p>
            <p className="truncate text-sm font-medium text-[var(--app-text)]">
              {selectedGif.title}
            </p>
          </div>
          <button
            aria-label="Clear selected GIF"
            className="rounded-full p-1 text-[var(--meta-text)] transition hover:bg-white/8 hover:text-[var(--app-text)]"
            type="button"
            onClick={() => setSelectedGif(undefined)}
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      <div className="flex items-end gap-2">
        <button
          aria-label="Open GIF picker"
          className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${
            pickerOpen
              ? 'border-white bg-white text-black'
              : 'border-[#363636] bg-black text-[#0095f6] hover:bg-[#0f0f0f]'
          }`}
          type="button"
          onClick={() => setPickerOpen((current) => !current)}
        >
          GIF
        </button>

        <div className="flex flex-1 items-end gap-2">
          <SmileIcon className="mb-2 hidden h-5 w-5 shrink-0 text-[var(--meta-text)] sm:block" />
          <label className="block flex-1">
            <span className="sr-only">Write a comment</span>
            <textarea
              className="min-h-10 max-h-24 w-full resize-none border-0 bg-transparent px-0 py-2 text-sm leading-5 text-[var(--thread-text)] outline-none placeholder:text-[var(--meta-text)]"
              placeholder="Add a comment..."
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </label>
        </div>

        <button
          className="pb-2 text-sm font-semibold text-[#0095f6] transition hover:text-[#1877f2] disabled:cursor-not-allowed disabled:text-[#b2dffc]"
          disabled={!hasDraft}
          type="button"
          onClick={handlePost}
        >
          Post
        </button>
      </div>

      {pickerOpen ? (
        <GifPicker
          activeTab={activeTab}
          catalog={seedGifCatalog}
          isSaved={isSaved}
          savedGifs={savedGifs}
          searchQuery={searchQuery}
          selectedGifId={selectedGif?.id}
          onClose={() => setPickerOpen(false)}
          onSearchQueryChange={setSearchQuery}
          onSelectGif={(gif) => setSelectedGif(gif)}
          onToggleSaveGif={handleToggleSaveGif}
          onTabChange={setActiveTab}
        />
      ) : null}
    </div>
  )
}
