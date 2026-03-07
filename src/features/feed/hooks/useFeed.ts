import { useQuery } from '@tanstack/react-query'
import { useAppServices } from '../../../app/AppServicesContext'
import { queryKeys } from '../../../app/queryKeys'

export function useFeed() {
  const { feedRepository } = useAppServices()

  return useQuery({
    queryKey: queryKeys.feed,
    queryFn: () => feedRepository.getFeed(),
  })
}
