import type { GifCatalogRepository } from '../../../app/services'
import { fetchJson } from '../../../shared/lib/fetchJson'
import { gifAssetSchema, gifSearchResultSchema } from '../lib/schemas'

export class ApiGifCatalogRepository implements GifCatalogRepository {
  async search({ query, cursor }: { query: string; cursor?: string }) {
    const url = new URL('/api/gifs/search', window.location.origin)
    if (query) {
      url.searchParams.set('q', query)
    }
    if (cursor) {
      url.searchParams.set('cursor', cursor)
    }

    const response = await fetchJson<unknown>(url)
    return gifSearchResultSchema.parse(response)
  }

  async getById(gifId: string) {
    const response = await fetchJson<unknown>(`/api/gifs/${gifId}`)
    return gifAssetSchema.parse(response)
  }
}
