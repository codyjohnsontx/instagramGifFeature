import type { GifCatalogRepository } from '../../../app/services'
import { gifCatalog, gifCatalogById } from '../../../mocks/data/socialData'

export class MockGifCatalogRepository implements GifCatalogRepository {
  async search({ query }: { query: string }) {
    const trimmedQuery = query.trim().toLowerCase()
    const items = trimmedQuery
      ? gifCatalog.filter((gif) => gif.title.toLowerCase().includes(trimmedQuery))
      : gifCatalog

    return { items }
  }

  async getById(gifId: string) {
    return gifCatalogById[gifId] ?? null
  }
}
