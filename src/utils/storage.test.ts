import { describe, expect, it } from 'vitest'
import { STORAGE_KEY, readSavedGifs, removeSavedGif, upsertSavedGif } from './storage'

describe('storage utilities', () => {
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

    expect(readSavedGifs()).toEqual({
      data: [],
      hadError: true,
    })
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
