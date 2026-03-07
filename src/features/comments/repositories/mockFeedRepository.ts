import type { FeedRepository } from '../../../app/services'
import { getMockFeed } from '../../../mocks/data/mockFeedStore'

export class MockFeedRepository implements FeedRepository {
  async getFeed() {
    return getMockFeed()
  }
}
