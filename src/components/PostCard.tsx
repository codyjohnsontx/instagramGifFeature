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
  VerifiedBadgeIcon,
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

const postMeta = {
  'post-fern': { likes: '5.6K', verified: false },
  'post-supper': { likes: '3.2K', verified: true },
  'post-studio': { likes: '8.1K', verified: true },
} as const

export function PostCard({ post }: PostCardProps) {
  const [comments, setComments] = useState(post.comments)
  const meta = postMeta[post.id as keyof typeof postMeta] ?? {
    likes: `${post.comments.length * 410}`,
    verified: false,
  }

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
    <article className="relative mb-5 bg-black">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)] p-[1px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-black text-[11px] font-semibold text-white">
              {getInitials(post.author)}
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="truncate text-sm font-semibold text-[var(--app-text)]">
                {post.handle.replace('@', '')}
              </p>
              {meta.verified ? <VerifiedBadgeIcon className="h-4 w-4" /> : null}
              <span className="text-sm text-[var(--meta-text)]">•</span>
              <span className="text-sm text-[var(--meta-text)]">{post.comments[0]?.createdAt ?? '1h'}</span>
            </div>
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
          className="rounded-full p-1 text-[var(--action-icon)] transition hover:bg-white/8"
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
          <div className="flex items-center gap-5 text-[var(--action-icon)]">
            <button
              aria-label="Like post"
              className="transition hover:opacity-70"
              type="button"
            >
              <HeartIcon className="h-6 w-6" />
            </button>
            <span className="-ml-3 text-[2rem] font-semibold tracking-tight text-white">
              {meta.likes}
            </span>
            <button
              aria-label="Comment on post"
              className="transition hover:opacity-70"
              type="button"
            >
              <CommentBubbleIcon className="h-6 w-6" />
            </button>
            <span className="-ml-3 text-[2rem] font-semibold tracking-tight text-white">
              {comments.length}
            </span>
            <button
              aria-label="Share post"
              className="transition hover:opacity-70"
              type="button"
            >
              <PaperPlaneIcon className="h-6 w-6" />
            </button>
          </div>
          <button aria-label="Save post" className="transition hover:opacity-70" type="button">
            <BookmarkIcon className="h-6 w-6" />
          </button>
        </div>

        <p className="mb-1 text-[0.92rem] leading-6 text-[var(--thread-text)]">
          <span className="mr-1 font-semibold text-[var(--app-text)]">
            {post.handle.replace('@', '')}
          </span>
          {post.caption}
        </p>
        <button
          className="mb-3 text-sm text-[var(--meta-text)]"
          type="button"
        >
          View all {comments.length} comments
        </button>

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
