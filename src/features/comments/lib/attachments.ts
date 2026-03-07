import type { CommentRecord, GifAsset } from '../../../types'

export function getGifAttachment(
  comment: CommentRecord,
  gifById: Record<string, GifAsset>,
) {
  const gifAttachment = comment.attachments.find((attachment) => attachment.kind === 'gif')

  return gifAttachment ? gifById[gifAttachment.gifId] : undefined
}
