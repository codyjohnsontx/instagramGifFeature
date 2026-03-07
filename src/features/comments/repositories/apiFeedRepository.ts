import type { FeedRepository } from '../../../app/services'
import { feedDataSchema } from '../lib/schemas'
import { fetchJson } from '../../../shared/lib/fetchJson'

export class ApiFeedRepository implements FeedRepository {
  async getFeed() {
    const response = await fetchJson<unknown>('/api/feed')
    return feedDataSchema.parse(response)
  }
}
