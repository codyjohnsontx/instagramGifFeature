import { useState } from 'react'
import type { CommentDraft, CommentItem, PostItem } from '../types'
import { CommentComposer } from './CommentComposer'
import { CommentThread } from './CommentThread'
import {
  BookmarkIcon,
  CommentBubbleIcon,
  HeartIcon,
  MoreIcon,
  PaperPlaneIcon,
} from './Icons'

type PostCardProps = {
  post: PostItem
}

function createCommentId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `comment-${Date.now()}-${Math.round(Math.random() * 1000)}`
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function PostCard({ post }: PostCardProps) {
  const [comments, setComments] = useState(post.comments)

  const handlePostComment = (draft: CommentDraft) => {
    const nextComment: CommentItem = draft.gif
      ? {
          id: createCommentId(),
          author: 'You',
          createdAt: 'Just now',
          type: 'gif',
          text: draft.text,
          gif: draft.gif,
        }
      : {
          id: createCommentId(),
          author: 'You',
          createdAt: 'Just now',
          type: 'text',
          text: draft.text,
        }

    setComments((currentComments) => [...currentComments, nextComment])
  }

  return (
    <article className="relative border-y border-[var(--card-border)] bg-white sm:rounded-sm sm:border">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)] p-[1px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-[11px] font-semibold text-slate-800">
              {getInitials(post.author)}
            </div>
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[var(--app-text)]">
              {post.author}
            </p>
            {post.location ? (
              <p className="truncate text-[11px] text-[var(--meta-text)]">
                {post.location}
              </p>
            ) : (
              <p className="truncate text-[11px] text-[var(--meta-text)]">{post.handle}</p>
            )}
          </div>
        </div>
        <button
          aria-label="Post options"
          className="rounded-full p-1 text-[var(--action-icon)] transition hover:bg-slate-100"
          type="button"
        >
          <MoreIcon className="h-5 w-5" />
        </button>
      </div>

      <img
        alt={`${post.author} post`}
        className="aspect-square w-full object-cover"
        src={post.imageUrl}
      />

      <div className="px-4 pb-3 pt-3">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[var(--action-icon)]">
            <button
              aria-label="Like post"
              className="transition hover:opacity-70"
              type="button"
            >
              <HeartIcon className="h-6 w-6" />
            </button>
            <button
              aria-label="Comment on post"
              className="transition hover:opacity-70"
              type="button"
            >
              <CommentBubbleIcon className="h-6 w-6" />
            </button>
            <button
              aria-label="Share post"
              className="transition hover:opacity-70"
              type="button"
            >
              <PaperPlaneIcon className="h-6 w-6" />
            </button>
          </div>
          <button
            aria-label="Save post"
            className="transition hover:opacity-70"
            type="button"
          >
            <BookmarkIcon className="h-6 w-6" />
          </button>
        </div>

        <p className="mb-3 text-sm leading-5 text-[var(--thread-text)]">
          <span className="mr-1 font-semibold text-[var(--app-text)]">{post.author}</span>
          {post.caption}
        </p>

        <div className="mb-3">
          <CommentThread comments={comments} />
        </div>

        <div className="border-t border-[var(--card-border)] pt-2">
          <CommentComposer onPost={handlePostComment} />
        </div>
      </div>
    </article>
  )
}
