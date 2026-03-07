export type GifSource = 'giphy' | 'internal'

export type GifAsset = {
  id: string
  title: string
  previewUrl: string
  fullUrl: string
  source: GifSource
  aspectRatio?: number
}

export type GifCollection = {
  id: string
  name: string
  isDefault: boolean
  createdAt: string
}

export type SavedGifRecord = {
  gifId: string
  collectionId: string
  savedAt: string
}

export type SavedGifEntry = {
  gif: GifAsset
  record: SavedGifRecord
}

export type CommentAttachment = {
  kind: 'gif'
  gifId: string
}

export type CommentDraft = {
  text: string
  attachments: CommentAttachment[]
}

export type CommentRecord = {
  id: string
  author: string
  createdAt: string
  text?: string
  attachments: CommentAttachment[]
}

export type PostRecord = {
  id: string
  author: string
  handle: string
  location?: string
  imageUrl: string
  caption: string
  comments: CommentRecord[]
}

export type StoryItem = {
  id: string
  name: string
  avatarUrl: string
  seen?: boolean
}

export type ToastMessage = {
  id: string
  message: string
  tone?: 'default' | 'error'
}

export type GifPickerTab = 'search' | 'saved'

export type GifSearchResult = {
  items: GifAsset[]
  nextCursor?: string
}

export type SavedLibraryState = {
  collections: GifCollection[]
  savedRecords: SavedGifRecord[]
  activeCollectionId: string
}

export type FeedData = {
  posts: PostRecord[]
  stories: StoryItem[]
}
