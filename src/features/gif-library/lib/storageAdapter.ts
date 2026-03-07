import type { GifCollection, SavedGifRecord, SavedLibraryState } from '../../../types'
import { starterCollections, starterSavedGifIds } from '../../../mocks/data/socialData'
import { gifLibraryStateSchema } from './schemas'

export const STORAGE_KEY = 'instagram_gif_library_v2'

function buildInitialState(now = Date.now()): SavedLibraryState {
  const defaultCollectionId = starterCollections[0]?.id ?? 'collection-my-gifs'

  return {
    collections: starterCollections.map((collection) => ({ ...collection })),
    savedRecords: starterSavedGifIds.map((gifId, index) => ({
      gifId,
      collectionId: defaultCollectionId,
      savedAt: new Date(now - index * 1_000).toISOString(),
    })),
    activeCollectionId: defaultCollectionId,
  }
}

export function readLibraryState(): { data: SavedLibraryState; hadError: boolean } {
  const fallback = buildInitialState()

  if (typeof window === 'undefined') {
    return { data: fallback, hadError: false }
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY)

    if (!rawValue) {
      return { data: fallback, hadError: false }
    }

    const parsed = gifLibraryStateSchema.parse(JSON.parse(rawValue))
    const activeCollectionId =
      parsed.collections.find((collection) => collection.isDefault)?.id ??
      parsed.collections[0]?.id ??
      fallback.activeCollectionId

    return {
      data: {
        collections: parsed.collections,
        savedRecords: parsed.savedRecords,
        activeCollectionId,
      },
      hadError: false,
    }
  } catch {
    return { data: fallback, hadError: true }
  }
}

export function writeLibraryState(input: {
  collections: GifCollection[]
  savedRecords: SavedGifRecord[]
}) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(input))
}
