import type { GifItem, SavedGifItem } from '../types'

export const STORAGE_KEY = 'my_gifs_saved_v1'
const MAX_SAVED_GIFS = 50

function isSavedGifItem(value: unknown): value is SavedGifItem {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.url === 'string' &&
    (candidate.previewUrl === undefined || typeof candidate.previewUrl === 'string') &&
    (candidate.source === undefined || typeof candidate.source === 'string') &&
    typeof candidate.savedAt === 'number' &&
    Number.isFinite(candidate.savedAt)
  )
}

function sortSavedGifs(items: SavedGifItem[]) {
  return [...items].sort((left, right) => right.savedAt - left.savedAt)
}

export function readSavedGifs(): { data: SavedGifItem[]; hadError: boolean } {
  if (typeof window === 'undefined') {
    return { data: [], hadError: false }
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY)

    if (!rawValue) {
      return { data: [], hadError: false }
    }

    const parsed = JSON.parse(rawValue)

    if (!Array.isArray(parsed)) {
      return { data: [], hadError: true }
    }

    const data = sortSavedGifs(parsed.filter(isSavedGifItem))
    return { data, hadError: false }
  } catch {
    return { data: [], hadError: true }
  }
}

export function writeSavedGifs(items: SavedGifItem[]): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Ignore storage write failures in this prototype.
  }
}

export function upsertSavedGif(
  items: SavedGifItem[],
  gif: GifItem,
  now = Date.now(),
): {
  items: SavedGifItem[]
  removedOldest: boolean
  saved: boolean
} {
  const alreadySaved = items.some((item) => item.id === gif.id)

  if (alreadySaved) {
    return {
      items: sortSavedGifs(items),
      removedOldest: false,
      saved: false,
    }
  }

  const nextItems = [...items, { ...gif, savedAt: now }]
  let removedOldest = false

  if (nextItems.length > MAX_SAVED_GIFS) {
    removedOldest = true
    let oldestIndex = 0

    for (let index = 1; index < nextItems.length; index += 1) {
      if (nextItems[index].savedAt < nextItems[oldestIndex].savedAt) {
        oldestIndex = index
      }
    }

    nextItems.splice(oldestIndex, 1)
  }

  return {
    items: sortSavedGifs(nextItems),
    removedOldest,
    saved: true,
  }
}

export function removeSavedGif(
  items: SavedGifItem[],
  gifId: string,
): {
  items: SavedGifItem[]
  removed: boolean
} {
  const nextItems = items.filter((item) => item.id !== gifId)

  return {
    items: sortSavedGifs(nextItems),
    removed: nextItems.length !== items.length,
  }
}
