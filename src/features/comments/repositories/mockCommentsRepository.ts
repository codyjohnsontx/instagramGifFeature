import type { CommentsRepository } from '../../../app/services'
import { getMockFeed, appendMockComment } from '../../../mocks/data/mockFeedStore'
import { createPostedComment } from '../lib/commentDrafts'

export class MockCommentsRepository implements CommentsRepository {
  async createComment(input: { postId: string; draft: import('../../../types').CommentDraft }) {
    const feed = getMockFeed()
    const targetPost = feed.posts.find((post) => post.id === input.postId)

    if (!targetPost) {
      throw new Error('Post not found')
    }

    const nextPost = {
      ...targetPost,
      comments: [...targetPost.comments, createPostedComment(input.draft)],
    }

    appendMockComment(input.postId, nextPost)

    return nextPost
  }
}
