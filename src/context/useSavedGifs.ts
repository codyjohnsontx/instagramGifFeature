import { useContext } from 'react'
import { savedGifsStore } from './savedGifsStore'

export function useSavedGifs() {
  const context = useContext(savedGifsStore)

  if (!context) {
    throw new Error('useSavedGifs must be used within SavedGifsProvider')
  }

  return context
}
