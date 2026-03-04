import { useRef, useState } from 'react'
import type { CommentItem as CommentEntity } from '../types'
import { useSavedGifs } from '../context/useSavedGifs'
import { useToast } from '../context/useToast'
import { GifImage } from './GifImage'
import { BookmarkIcon, MoreIcon } from './Icons'
import { PopoverMenu } from './PopoverMenu'

type CommentItemProps = {
  comment: CommentEntity
}

export function CommentItem({ comment }: CommentItemProps) {
  const { isSaved, removeGif, saveGif } = useSavedGifs()
  const { showToast } = useToast()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  if (comment.type === 'text' || !comment.gif) {
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

  const saved = isSaved(comment.gif.id)

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

        <div className="relative shrink-0">
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
                    label: 'Remove from My GIFs',
                    onSelect: () => {
                      if (removeGif(comment.gif!.id)) {
                        showToast('Removed from My GIFs')
                      }
                    },
                    destructive: true,
                  }
                : {
                    label: 'Save GIF',
                    onSelect: () => {
                      const result = saveGif(comment.gif!)

                      if (!result.saved) {
                        return
                      }

                      showToast(
                        result.removedOldest
                          ? 'Library full, removed oldest GIF'
                          : 'Saved to My GIFs',
                      )
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
          alt={comment.gif.title}
          className="aspect-[4/3] w-full object-cover"
          placeholderClassName="aspect-[4/3] w-full rounded-none border-0 bg-[#181818] text-[var(--meta-text)]"
          src={comment.gif.url}
        />
      </div>
    </div>
  )
}
