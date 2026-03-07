import { z } from 'zod'

export const gifAssetSchema = z.object({
  id: z.string(),
  title: z.string(),
  previewUrl: z.string().url(),
  fullUrl: z.string().url(),
  source: z.enum(['giphy', 'internal']),
  aspectRatio: z.number().positive().optional(),
})

export const gifCollectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  isDefault: z.boolean(),
  createdAt: z.string(),
})

export const savedGifRecordSchema = z.object({
  gifId: z.string(),
  collectionId: z.string(),
  savedAt: z.string(),
})

export const gifSearchResultSchema = z.object({
  items: z.array(gifAssetSchema),
  nextCursor: z.string().optional(),
})

export const gifCollectionsResponseSchema = z.object({
  collections: z.array(gifCollectionSchema),
})

export const savedGifRecordsResponseSchema = z.object({
  records: z.array(savedGifRecordSchema),
})

export const gifLibraryStateSchema = z.object({
  collections: z.array(gifCollectionSchema),
  savedRecords: z.array(savedGifRecordSchema),
})
