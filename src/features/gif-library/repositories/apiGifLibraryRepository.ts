import type { GifLibraryRepository } from '../../../app/services'
import { fetchJson } from '../../../shared/lib/fetchJson'
import {
  gifCollectionSchema,
  gifCollectionsResponseSchema,
  savedGifRecordsResponseSchema,
} from '../lib/schemas'

export class ApiGifLibraryRepository implements GifLibraryRepository {
  async listCollections() {
    const response = await fetchJson<unknown>('/api/library/collections')
    return gifCollectionsResponseSchema.parse(response).collections
  }

  async createCollection(input: { name: string }) {
    const response = await fetchJson<unknown>('/api/library/collections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })

    return gifCollectionSchema.parse(response)
  }

  async listSaved(params?: { collectionId?: string }) {
    const url = new URL('/api/library/saved', window.location.origin)
    if (params?.collectionId) {
      url.searchParams.set('collectionId', params.collectionId)
    }

    const response = await fetchJson<unknown>(url)
    return savedGifRecordsResponseSchema.parse(response).records
  }

  async saveGif(input: { gifId: string; collectionId: string }) {
    await fetchJson('/api/library/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
  }

  async removeGif(input: { gifId: string; collectionId?: string }) {
    await fetchJson('/api/library/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
  }

  async moveGif(input: {
    gifId: string
    fromCollectionId: string
    toCollectionId: string
  }) {
    await fetchJson('/api/library/move', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
  }
}
