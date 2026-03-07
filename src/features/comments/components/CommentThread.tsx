import type { CommentRecord } from '../../../types'
import { useGifCatalogMap } from '../../gif-library/hooks/useGifSearch'
import { CommentItem } from './CommentItem'

export function CommentThread({ comments }: { comments: CommentRecord[] }) {
  const { gifById } = useGifCatalogMap()

  return (
    <div className="space-y-2.5">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} gifById={gifById} />
      ))}
    </div>
  )
}
