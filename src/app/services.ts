import type {
  CommentDraft,
  FeedData,
  GifAsset,
  GifCollection,
  GifSearchResult,
  PostRecord,
  SavedGifRecord,
} from '../types'

export interface FeedRepository {
  getFeed(): Promise<FeedData>
}

export interface GifCatalogRepository {
  search(params: { query: string; cursor?: string }): Promise<GifSearchResult>
  getById(gifId: string): Promise<GifAsset | null>
}

export interface GifLibraryRepository {
  listCollections(): Promise<GifCollection[]>
  createCollection(input: { name: string }): Promise<GifCollection>
  listSaved(params?: { collectionId?: string }): Promise<SavedGifRecord[]>
  saveGif(input: { gifId: string; collectionId: string }): Promise<void>
  removeGif(input: { gifId: string; collectionId?: string }): Promise<void>
  moveGif(input: {
    gifId: string
    fromCollectionId: string
    toCollectionId: string
  }): Promise<void>
}

export interface CommentsRepository {
  createComment(input: { postId: string; draft: CommentDraft }): Promise<PostRecord>
}

export type AppServices = {
  feedRepository: FeedRepository
  gifCatalogRepository: GifCatalogRepository
  gifLibraryRepository: GifLibraryRepository
  commentsRepository: CommentsRepository
}
