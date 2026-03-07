import type { CommentsRepository } from '../../../app/services'
import { fetchJson } from '../../../shared/lib/fetchJson'
import { postRecordSchema } from '../lib/schemas'

export class ApiCommentsRepository implements CommentsRepository {
  async createComment(input: {
    postId: string
    draft: import('../../../types').CommentDraft
  }) {
    const response = await fetchJson<unknown>('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })

    return postRecordSchema.parse(response)
  }
}
