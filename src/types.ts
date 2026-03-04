export type GifItem = {
  id: string
  title: string
  url: string
  previewUrl?: string
  source?: string
}

export type CommentItem = {
  id: string
  author: string
  createdAt: string
  type: 'text' | 'gif'
  text?: string
  gif?: GifItem
}

export type SavedGifItem = GifItem & {
  savedAt: number
}

export type PostItem = {
  id: string
  author: string
  handle: string
  location?: string
  imageUrl: string
  caption: string
  comments: CommentItem[]
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

export type SavedGifsContextValue = {
  savedGifs: SavedGifItem[]
  isSaved: (gifId: string) => boolean
  saveGif: (gif: GifItem) => { removedOldest?: boolean; saved: boolean }
  removeGif: (gifId: string) => boolean
}

export type SavedGifsProviderValue = SavedGifsContextValue & {
  hydrationError: boolean
}

export type CommentDraft = {
  text?: string
  gif?: GifItem
}

export type GifPickerTab = 'search' | 'saved'
