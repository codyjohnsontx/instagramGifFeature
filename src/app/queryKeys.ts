export const queryKeys = {
  feed: ['feed'] as const,
  gifSearch: (query: string) => ['gif-search', query] as const,
  gifCollections: ['gif-collections'] as const,
  savedGifs: ['saved-gifs'] as const,
}
