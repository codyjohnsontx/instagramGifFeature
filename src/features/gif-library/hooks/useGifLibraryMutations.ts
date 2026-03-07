import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../../app/queryKeys'
import { useAppServices } from '../../../app/AppServicesContext'
import type { GifCollection, SavedGifRecord } from '../../../types'

export function useCreateCollectionMutation() {
  const { gifLibraryRepository } = useAppServices()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: { name: string }) => gifLibraryRepository.createCollection(input),
    onSuccess: async (collection) => {
      queryClient.setQueryData<GifCollection[]>(
        queryKeys.gifCollections,
        (current = []) => [...current, collection],
      )
    },
  })
}

export function useSaveGifMutation() {
  const { gifLibraryRepository } = useAppServices()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: { gifId: string; collectionId: string }) =>
      gifLibraryRepository.saveGif(input),
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.savedGifs })
      const previousRecords =
        queryClient.getQueryData<SavedGifRecord[]>(queryKeys.savedGifs) ?? []

      queryClient.setQueryData<SavedGifRecord[]>(queryKeys.savedGifs, (current = []) => {
        const exists = current.some(
          (record) =>
            record.gifId === input.gifId && record.collectionId === input.collectionId,
        )

        if (exists) {
          return current
        }

        return [
          {
            gifId: input.gifId,
            collectionId: input.collectionId,
            savedAt: new Date().toISOString(),
          },
          ...current,
        ]
      })

      return { previousRecords }
    },
    onError: (_error, _input, context) => {
      if (context?.previousRecords) {
        queryClient.setQueryData(queryKeys.savedGifs, context.previousRecords)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.savedGifs })
    },
  })
}

export function useRemoveGifMutation() {
  const { gifLibraryRepository } = useAppServices()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: { gifId: string; collectionId?: string }) =>
      gifLibraryRepository.removeGif(input),
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.savedGifs })
      const previousRecords =
        queryClient.getQueryData<SavedGifRecord[]>(queryKeys.savedGifs) ?? []

      queryClient.setQueryData<SavedGifRecord[]>(queryKeys.savedGifs, (current = []) =>
        current.filter((record) => {
          if (record.gifId !== input.gifId) {
            return true
          }

          if (!input.collectionId) {
            return false
          }

          return record.collectionId !== input.collectionId
        }),
      )

      return { previousRecords }
    },
    onError: (_error, _input, context) => {
      if (context?.previousRecords) {
        queryClient.setQueryData(queryKeys.savedGifs, context.previousRecords)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.savedGifs })
    },
  })
}

export function useMoveGifMutation() {
  const { gifLibraryRepository } = useAppServices()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: {
      gifId: string
      fromCollectionId: string
      toCollectionId: string
    }) => gifLibraryRepository.moveGif(input),
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.savedGifs })
      const previousRecords =
        queryClient.getQueryData<SavedGifRecord[]>(queryKeys.savedGifs) ?? []

      queryClient.setQueryData<SavedGifRecord[]>(queryKeys.savedGifs, (current = []) => {
        const withoutOrigin = current.filter(
          (record) =>
            !(
              record.gifId === input.gifId &&
              record.collectionId === input.fromCollectionId
            ),
        )
        const exists = withoutOrigin.some(
          (record) =>
            record.gifId === input.gifId &&
            record.collectionId === input.toCollectionId,
        )

        return exists
          ? withoutOrigin
          : [
              {
                gifId: input.gifId,
                collectionId: input.toCollectionId,
                savedAt: new Date().toISOString(),
              },
              ...withoutOrigin,
            ]
      })

      return { previousRecords }
    },
    onError: (_error, _input, context) => {
      if (context?.previousRecords) {
        queryClient.setQueryData(queryKeys.savedGifs, context.previousRecords)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.savedGifs })
    },
  })
}
