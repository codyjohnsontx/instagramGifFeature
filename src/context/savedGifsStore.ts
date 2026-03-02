import { createContext } from 'react'
import type { SavedGifsProviderValue } from '../types'

export const savedGifsStore = createContext<SavedGifsProviderValue | undefined>(
  undefined,
)
