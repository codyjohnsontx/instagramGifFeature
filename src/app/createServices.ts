import { ApiCommentsRepository } from '../features/comments/repositories/apiCommentsRepository'
import { ApiFeedRepository } from '../features/comments/repositories/apiFeedRepository'
import { MockCommentsRepository } from '../features/comments/repositories/mockCommentsRepository'
import { MockFeedRepository } from '../features/comments/repositories/mockFeedRepository'
import { ApiGifCatalogRepository } from '../features/gif-library/repositories/apiGifCatalogRepository'
import { ApiGifLibraryRepository } from '../features/gif-library/repositories/apiGifLibraryRepository'
import { MockGifCatalogRepository } from '../features/gif-library/repositories/mockGifCatalogRepository'
import { MockGifLibraryRepository } from '../features/gif-library/repositories/mockGifLibraryRepository'
import type { AppServices } from './services'

export function createServices(mode: 'api' | 'mock'): AppServices {
  if (mode === 'api') {
    return {
      feedRepository: new ApiFeedRepository(),
      gifCatalogRepository: new ApiGifCatalogRepository(),
      gifLibraryRepository: new ApiGifLibraryRepository(),
      commentsRepository: new ApiCommentsRepository(),
    }
  }

  return {
    feedRepository: new MockFeedRepository(),
    gifCatalogRepository: new MockGifCatalogRepository(),
    gifLibraryRepository: new MockGifLibraryRepository(),
    commentsRepository: new MockCommentsRepository(),
  }
}
