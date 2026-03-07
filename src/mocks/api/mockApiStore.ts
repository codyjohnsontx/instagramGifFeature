import type { GifCollection, PostRecord, SavedGifRecord, StoryItem } from '../../types'
import {
  clonePosts,
  starterCollections,
  starterSavedGifIds,
  stories,
} from '../data/socialData'

type ApiState = {
  posts: PostRecord[]
  stories: StoryItem[]
  collections: GifCollection[]
  savedRecords: SavedGifRecord[]
}

function buildInitialApiState(): ApiState {
  const defaultCollectionId = starterCollections[0]?.id ?? 'collection-my-gifs'

  return {
    posts: clonePosts(),
    stories: stories.map((story) => ({ ...story })),
    collections: starterCollections.map((collection) => ({ ...collection })),
    savedRecords: starterSavedGifIds.map((gifId, index) => ({
      gifId,
      collectionId: defaultCollectionId,
      savedAt: new Date(Date.now() - index * 1_000).toISOString(),
    })),
  }
}

let apiState = buildInitialApiState()

export function getApiState() {
  return {
    posts: apiState.posts.map((post) => ({
      ...post,
      comments: post.comments.map((comment) => ({
        ...comment,
        attachments: [...comment.attachments],
      })),
    })),
    stories: apiState.stories.map((story) => ({ ...story })),
    collections: apiState.collections.map((collection) => ({ ...collection })),
    savedRecords: apiState.savedRecords.map((record) => ({ ...record })),
  }
}

export function setApiState(updater: (state: ApiState) => ApiState) {
  apiState = updater(apiState)
}

export function resetApiState() {
  apiState = buildInitialApiState()
}
