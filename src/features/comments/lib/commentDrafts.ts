import type { CommentDraft, CommentRecord, GifAsset } from '../../../types'

function createCommentId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `comment-${Date.now()}-${Math.round(Math.random() * 1000)}`
}

export function createCommentDraft(text: string, selectedGif?: GifAsset): CommentDraft {
  return {
    text: text.trim(),
    attachments: selectedGif ? [{ kind: 'gif', gifId: selectedGif.id }] : [],
  }
}

export function createPostedComment(draft: CommentDraft): CommentRecord {
  return {
    id: createCommentId(),
    author: 'You',
    createdAt: 'Just now',
    text: draft.text || undefined,
    attachments: [...draft.attachments],
  }
}
