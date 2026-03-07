import type { GifLibraryRepository } from '../../../app/services'
import type { GifCollection } from '../../../types'
import {
  readLibraryState,
  writeLibraryState,
} from '../lib/storageAdapter'

function sortCollections(collections: GifCollection[]) {
  return [...collections].sort((left, right) =>
    left.createdAt.localeCompare(right.createdAt),
  )
}

function buildCollectionId(name: string) {
  const normalized = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  return `collection-${normalized || 'folder'}-${Date.now()}`
}

export class MockGifLibraryRepository implements GifLibraryRepository {
  async listCollections() {
    return sortCollections(readLibraryState().data.collections)
  }

  async createCollection({ name }: { name: string }) {
    const trimmedName = name.trim()

    if (!trimmedName) {
      throw new Error('Collection name is required')
    }

    const { data } = readLibraryState()
    const duplicate = data.collections.some(
      (collection) => collection.name.toLowerCase() === trimmedName.toLowerCase(),
    )

    if (duplicate) {
      throw new Error('A folder with that name already exists')
    }

    const nextCollection: GifCollection = {
      id: buildCollectionId(trimmedName),
      name: trimmedName,
      isDefault: false,
      createdAt: new Date().toISOString(),
    }

    writeLibraryState({
      collections: [...data.collections, nextCollection],
      savedRecords: data.savedRecords,
    })

    return nextCollection
  }

  async listSaved(params?: { collectionId?: string }) {
    const { data } = readLibraryState()
    const filteredRecords = params?.collectionId
      ? data.savedRecords.filter((record) => record.collectionId === params.collectionId)
      : data.savedRecords

    return [...filteredRecords].sort((left, right) =>
      right.savedAt.localeCompare(left.savedAt),
    )
  }

  async saveGif(input: { gifId: string; collectionId: string }) {
    const { data } = readLibraryState()
    const exists = data.savedRecords.some(
      (record) =>
        record.gifId === input.gifId && record.collectionId === input.collectionId,
    )

    if (exists) {
      return
    }

    writeLibraryState({
      collections: data.collections,
      savedRecords: [
        {
          gifId: input.gifId,
          collectionId: input.collectionId,
          savedAt: new Date().toISOString(),
        },
        ...data.savedRecords,
      ],
    })
  }

  async removeGif(input: { gifId: string; collectionId?: string }) {
    const { data } = readLibraryState()

    writeLibraryState({
      collections: data.collections,
      savedRecords: data.savedRecords.filter((record) => {
        if (record.gifId !== input.gifId) {
          return true
        }

        if (!input.collectionId) {
          return false
        }

        return record.collectionId !== input.collectionId
      }),
    })
  }

  async moveGif(input: {
    gifId: string
    fromCollectionId: string
    toCollectionId: string
  }) {
    if (input.fromCollectionId === input.toCollectionId) {
      return
    }

    const { data } = readLibraryState()
    const nextSavedRecords = data.savedRecords.filter(
      (record) =>
        !(
          record.gifId === input.gifId &&
          record.collectionId === input.fromCollectionId
        ),
    )
    const alreadyInDestination = nextSavedRecords.some(
      (record) =>
        record.gifId === input.gifId &&
        record.collectionId === input.toCollectionId,
    )

    writeLibraryState({
      collections: data.collections,
      savedRecords: alreadyInDestination
        ? nextSavedRecords
        : [
            {
              gifId: input.gifId,
              collectionId: input.toCollectionId,
              savedAt: new Date().toISOString(),
            },
            ...nextSavedRecords,
          ],
    })
  }
}
