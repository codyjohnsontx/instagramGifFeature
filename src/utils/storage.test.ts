import { describe, expect, it } from 'vitest'
import { seedMyGifsStarter } from '../data/gifs'
import {
  STORAGE_KEY,
  buildInitialSavedGifs,
  readSavedGifs,
  removeSavedGif,
  upsertSavedGif,
} from './storage'

describe('storage utilities', () => {
  it('returns starter seeded GIFs when no localStorage entry exists', () => {
    const result = readSavedGifs()

    expect(result.hadError).toBe(false)
    expect(result.data).toHaveLength(seedMyGifsStarter.length)
    expect(result.data.map((item) => item.id)).toEqual(seedMyGifsStarter.map((item) => item.id))
  })

  it('reads valid saved GIF data from localStorage', () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 'gif-1',
          title: 'One',
          url: 'https://example.com/one.gif',
          savedAt: 100,
        },
      ]),
    )

    expect(readSavedGifs()).toEqual({
      data: [
        {
          id: 'gif-1',
          title: 'One',
          url: 'https://example.com/one.gif',
          savedAt: 100,
        },
      ],
      hadError: false,
    })
  })

  it('falls back safely when localStorage contains malformed JSON', () => {
    window.localStorage.setItem(STORAGE_KEY, '{"bad-json"')

    const result = readSavedGifs()

    expect(result.hadError).toBe(true)
    expect(result.data.map((item) => item.id)).toEqual(seedMyGifsStarter.map((item) => item.id))
  })

  it('strips invalid entries from parsed storage data', () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 'gif-1',
          title: 'One',
          url: 'https://example.com/one.gif',
          savedAt: 100,
        },
        {
          id: 'gif-2',
          title: 'Two',
          url: 25,
          savedAt: 200,
        },
      ]),
    )

    expect(readSavedGifs()).toEqual({
      data: [
        {
          id: 'gif-1',
          title: 'One',
          url: 'https://example.com/one.gif',
          savedAt: 100,
        },
      ],
      hadError: false,
    })
  })

  it('respects an explicitly empty saved GIF array', () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([]))

    expect(readSavedGifs()).toEqual({
      data: [],
      hadError: false,
    })
  })

  it('falls back to starter GIFs when stored entries are entirely invalid', () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 25,
          title: 'Broken',
          url: 10,
          savedAt: 'bad',
        },
      ]),
    )

    const result = readSavedGifs()

    expect(result.hadError).toBe(true)
    expect(result.data.map((item) => item.id)).toEqual(seedMyGifsStarter.map((item) => item.id))
  })

  it('builds starter saved GIFs with stable newest-first ordering', () => {
    const result = buildInitialSavedGifs(seedMyGifsStarter.slice(0, 3), 1000)

    expect(result.map((item) => item.id)).toEqual(
      seedMyGifsStarter.slice(0, 3).map((item) => item.id),
    )
    expect(result.map((item) => item.savedAt)).toEqual([1000, 999, 998])
  })

  it('inserts a new GIF when saving', () => {
    const result = upsertSavedGif([], {
      id: 'gif-1',
      title: 'One',
      url: 'https://example.com/one.gif',
    }, 100)

    expect(result).toEqual({
      items: [
        {
          id: 'gif-1',
          title: 'One',
          url: 'https://example.com/one.gif',
          savedAt: 100,
        },
      ],
      removedOldest: false,
      saved: true,
    })
  })

  it('deduplicates by GIF id when saving the same GIF twice', () => {
    const originalItems = [
      {
        id: 'gif-1',
        title: 'One',
        url: 'https://example.com/one.gif',
        savedAt: 100,
      },
    ]

    const result = upsertSavedGif(
      originalItems,
      {
        id: 'gif-1',
        title: 'One',
        url: 'https://example.com/one.gif',
      },
      200,
    )

    expect(result).toEqual({
      items: originalItems,
      removedOldest: false,
      saved: false,
    })
  })

  it('evicts the oldest GIF when the library is full', () => {
    const items = Array.from({ length: 50 }, (_, index) => ({
      id: `gif-${index}`,
      title: `GIF ${index}`,
      url: `https://example.com/${index}.gif`,
      savedAt: index + 1,
    }))

    const result = upsertSavedGif(
      items,
      {
        id: 'gif-new',
        title: 'New',
        url: 'https://example.com/new.gif',
      },
      500,
    )

    expect(result.removedOldest).toBe(true)
    expect(result.saved).toBe(true)
    expect(result.items).toHaveLength(50)
    expect(result.items.some((item) => item.id === 'gif-0')).toBe(false)
    expect(result.items[0].id).toBe('gif-new')
  })

  it('removes an existing GIF', () => {
    const result = removeSavedGif(
      [
        {
          id: 'gif-1',
          title: 'One',
          url: 'https://example.com/one.gif',
          savedAt: 100,
        },
      ],
      'gif-1',
    )

    expect(result).toEqual({
      items: [],
      removed: true,
    })
  })

  it('does not change the collection when removing a missing GIF', () => {
    const items = [
      {
        id: 'gif-1',
        title: 'One',
        url: 'https://example.com/one.gif',
        savedAt: 100,
      },
    ]

    expect(removeSavedGif(items, 'gif-2')).toEqual({
      items,
      removed: false,
    })
  })
})
