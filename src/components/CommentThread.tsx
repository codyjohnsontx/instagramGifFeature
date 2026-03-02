import type { CommentItem as CommentEntity } from '../types'
import { CommentItem } from './CommentItem'

type CommentThreadProps = {
  comments: CommentEntity[]
}

export function CommentThread({ comments }: CommentThreadProps) {
  return (
    <div className="space-y-2.5">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  )
}
