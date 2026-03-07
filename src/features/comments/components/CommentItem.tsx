import { useRef, useState } from 'react'
import type { CommentRecord, GifAsset } from '../../../types'
import { useSavedGifs } from '../../gif-library/context/SavedGifsContext'
import { useToast } from '../../../shared/context/ToastContext'
import { getGifAttachment } from '../lib/attachments'
import { GifImage } from '../../../shared/ui/GifImage'
import { BookmarkIcon, MoreIcon } from '../../../shared/ui/Icons'
import { PopoverMenu } from '../../../shared/ui/PopoverMenu'

export function CommentItem({
  comment,
  gifById,
}: {
  comment: CommentRecord
  gifById: Record<string, GifAsset>
}) {
  const gif = getGifAttachment(comment, gifById)
  const { defaultCollectionId, isSaved, removeGif, saveGif } = useSavedGifs()
  const { showToast } = useToast()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  if (!gif) {
    return (
      <div className="text-sm leading-5 text-[var(--thread-text)]">
        <p>
          <span className="mr-1 font-semibold text-[var(--app-text)]">{comment.author}</span>
          {comment.text}
        </p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.08em] text-[var(--meta-text)]">
          {comment.createdAt}
        </p>
      </div>
    )
  }

  const saved = isSaved(gif.id)
  const toggleSavedState = async () => {
    try {
      if (saved) {
        await removeGif({ gifId: gif.id })
        showToast('Removed from folders')
        return
      }

      await saveGif({ gifId: gif.id, collectionId: defaultCollectionId })
      showToast('Saved to My GIFs')
    } catch {
      showToast('Could not update saved folders', 'error')
    }
  }

  return (
    <div className="group">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm leading-5 text-[var(--thread-text)]">
            <span className="mr-1 font-semibold text-[var(--app-text)]">{comment.author}</span>
            {comment.text ? comment.text : 'shared a GIF'}
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.08em] text-[var(--meta-text)]">
            {comment.createdAt}
          </p>
        </div>

        <div className="relative flex shrink-0 items-center gap-1.5">
          <button
            aria-label={
              saved
                ? `Remove ${gif.title} from folders`
                : `Save ${gif.title} to My GIFs`
            }
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition ${
              saved
                ? 'border-[#3b82f6] bg-[#13223a] text-[#7dc3ff] hover:bg-[#17304f]'
                : 'border-[#3a3a3a] bg-[#121212] text-white hover:bg-[#1a1a1a]'
            }`}
            type="button"
            onClick={() => {
              void toggleSavedState()
            }}
          >
            <BookmarkIcon className="h-3.5 w-3.5" filled={saved} />
            {saved ? 'Saved' : 'Save'}
          </button>
          <button
            ref={menuButtonRef}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            aria-label="Open GIF actions"
            className="rounded-full p-1 text-[var(--meta-text)] transition hover:bg-white/8 hover:text-[var(--app-text)] sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <MoreIcon className="h-5 w-5" />
          </button>
          <PopoverMenu
            actions={[
              saved
                ? {
                    label: 'Remove from folders',
                    onSelect: () => {
                      void toggleSavedState()
                    },
                    destructive: true,
                  }
                : {
                    label: 'Save to My GIFs',
                    onSelect: () => {
                      void toggleSavedState()
                    },
                  },
            ]}
            anchorRef={menuButtonRef}
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
          />
        </div>
      </div>

      <div className="relative w-full max-w-[250px] overflow-hidden rounded-[14px] border border-[#262626] bg-[#0f0f0f]">
        {saved ? (
          <div className="absolute left-2 top-2 z-10 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-[11px] font-medium text-white">
            <BookmarkIcon className="h-3.5 w-3.5" filled />
            Saved
          </div>
        ) : null}
        <GifImage
          alt={gif.title}
          className="aspect-[4/3] w-full object-cover"
          placeholderClassName="aspect-[4/3] w-full rounded-none border-0 bg-[#181818] text-[var(--meta-text)]"
          src={gif.fullUrl}
        />
      </div>
    </div>
  )
}
