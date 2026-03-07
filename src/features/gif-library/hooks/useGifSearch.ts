import { useDeferredValue } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAppServices } from '../../../app/AppServicesContext'
import { queryKeys } from '../../../app/queryKeys'

export function useGifSearch(query: string) {
  const { gifCatalogRepository } = useAppServices()
  const deferredQuery = useDeferredValue(query)

  return useQuery({
    queryKey: queryKeys.gifSearch(deferredQuery),
    queryFn: () => gifCatalogRepository.search({ query: deferredQuery }),
  })
}

export function useGifCatalogMap() {
  const query = useGifSearch('')

  return {
    ...query,
    gifById: Object.fromEntries(
      (query.data?.items ?? []).map((gif) => [gif.id, gif]),
    ),
  }
}
