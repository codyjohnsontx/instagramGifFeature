import type { FeedData, PostRecord } from '../../types'
import { clonePosts, stories } from './socialData'

let postsStore = clonePosts()

export function getMockFeed(): FeedData {
  return {
    posts: postsStore.map((post) => ({
      ...post,
      comments: post.comments.map((comment) => ({
        ...comment,
        attachments: [...comment.attachments],
      })),
    })),
    stories: stories.map((story) => ({ ...story })),
  }
}

export function appendMockComment(postId: string, nextPost: PostRecord) {
  postsStore = postsStore.map((post) => (post.id === postId ? nextPost : post))
}

export function resetMockFeedStore() {
  postsStore = clonePosts()
}
