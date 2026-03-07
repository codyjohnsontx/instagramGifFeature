import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useAppServices } from '../../../app/AppServicesContext'
import { queryKeys } from '../../../app/queryKeys'
import { useGifCatalogMap } from './useGifSearch'

export function useSavedGifLibrary() {
  const { gifLibraryRepository } = useAppServices()
  const collectionsQuery = useQuery({
    queryKey: queryKeys.gifCollections,
    queryFn: () => gifLibraryRepository.listCollections(),
  })
  const recordsQuery = useQuery({
    queryKey: queryKeys.savedGifs,
    queryFn: () => gifLibraryRepository.listSaved(),
  })
  const catalogQuery = useGifCatalogMap()

  const resolvedEntries = useMemo(() => {
    if (!recordsQuery.data) {
      return []
    }

    return recordsQuery.data
      .map((record) => {
        const gif = catalogQuery.gifById[record.gifId]
        return gif ? { gif, record } : null
      })
      .filter((entry) => entry !== null)
  }, [catalogQuery.gifById, recordsQuery.data])

  return {
    collectionsQuery,
    recordsQuery,
    catalogQuery,
    collections: collectionsQuery.data ?? [],
    savedRecords: recordsQuery.data ?? [],
    resolvedEntries,
    isPending:
      collectionsQuery.isPending || recordsQuery.isPending || catalogQuery.isPending,
  }
}
