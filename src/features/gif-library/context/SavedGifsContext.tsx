import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import type { GifCollection, SavedGifEntry } from '../../../types'
import {
  useCreateCollectionMutation,
  useMoveGifMutation,
  useRemoveGifMutation,
  useSaveGifMutation,
} from '../hooks/useGifLibraryMutations'
import { useSavedGifLibrary } from '../hooks/useSavedGifLibrary'

type SavedGifsContextValue = {
  collections: GifCollection[]
  resolvedEntries: SavedGifEntry[]
  activeCollectionId: string
  saveTargetCollectionId: string
  entriesForActiveCollection: SavedGifEntry[]
  defaultCollectionId: string
  setActiveCollectionId: (collectionId: string) => void
  setSaveTargetCollectionId: (collectionId: string) => void
  isSaved: (gifId: string, collectionId?: string) => boolean
  createCollection: (name: string) => Promise<GifCollection>
  saveGif: (input: { gifId: string; collectionId?: string }) => Promise<void>
  removeGif: (input: { gifId: string; collectionId?: string }) => Promise<void>
  moveGif: (input: {
    gifId: string
    fromCollectionId: string
    toCollectionId: string
  }) => Promise<void>
  isPending: boolean
}

const SavedGifsContext = createContext<SavedGifsContextValue | undefined>(undefined)

export function SavedGifsProvider({ children }: PropsWithChildren) {
  const { collections, resolvedEntries, isPending } = useSavedGifLibrary()
  const saveMutation = useSaveGifMutation()
  const removeMutation = useRemoveGifMutation()
  const moveMutation = useMoveGifMutation()
  const createCollectionMutation = useCreateCollectionMutation()
  const defaultCollectionId =
    collections.find((collection) => collection.isDefault)?.id ?? collections[0]?.id ?? ''
  const [requestedActiveCollectionId, setActiveCollectionId] = useState('')
  const [requestedSaveTargetCollectionId, setSaveTargetCollectionId] = useState('')
  const activeCollectionId = collections.some(
    (collection) => collection.id === requestedActiveCollectionId,
  )
    ? requestedActiveCollectionId
    : defaultCollectionId
  const saveTargetCollectionId = collections.some(
    (collection) => collection.id === requestedSaveTargetCollectionId,
  )
    ? requestedSaveTargetCollectionId
    : activeCollectionId || defaultCollectionId

  const entriesForActiveCollection = useMemo(
    () =>
      resolvedEntries.filter(
        (entry) => entry.record.collectionId === activeCollectionId,
      ),
    [activeCollectionId, resolvedEntries],
  )

  const value = useMemo<SavedGifsContextValue>(
    () => ({
      collections,
      resolvedEntries,
      activeCollectionId,
      saveTargetCollectionId,
      entriesForActiveCollection,
      defaultCollectionId,
      setActiveCollectionId,
      setSaveTargetCollectionId,
      isSaved: (gifId, collectionId) =>
        resolvedEntries.some(
          (entry) =>
            entry.gif.id === gifId &&
            (!collectionId || entry.record.collectionId === collectionId),
        ),
      createCollection: async (name) => createCollectionMutation.mutateAsync({ name }),
      saveGif: async ({ gifId, collectionId }) =>
        saveMutation.mutateAsync({
          gifId,
          collectionId: collectionId ?? saveTargetCollectionId ?? defaultCollectionId,
        }),
      removeGif: async ({ gifId, collectionId }) =>
        removeMutation.mutateAsync({ gifId, collectionId }),
      moveGif: async (input) => moveMutation.mutateAsync(input),
      isPending:
        isPending ||
        saveMutation.isPending ||
        removeMutation.isPending ||
        moveMutation.isPending ||
        createCollectionMutation.isPending,
    }),
    [
      activeCollectionId,
      collections,
      createCollectionMutation,
      defaultCollectionId,
      entriesForActiveCollection,
      isPending,
      moveMutation,
      removeMutation,
      resolvedEntries,
      saveMutation,
      saveTargetCollectionId,
    ],
  )

  return (
    <SavedGifsContext.Provider value={value}>{children}</SavedGifsContext.Provider>
  )
}

export function useSavedGifs() {
  const context = useContext(SavedGifsContext)

  if (!context) {
    throw new Error('useSavedGifs must be used within SavedGifsProvider')
  }

  return context
}
