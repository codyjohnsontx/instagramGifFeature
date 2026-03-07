import { z } from 'zod'

export const commentAttachmentSchema = z.object({
  kind: z.literal('gif'),
  gifId: z.string(),
})

export const commentDraftSchema = z.object({
  text: z.string(),
  attachments: z.array(commentAttachmentSchema),
})

export const commentRecordSchema = z.object({
  id: z.string(),
  author: z.string(),
  createdAt: z.string(),
  text: z.string().optional(),
  attachments: z.array(commentAttachmentSchema),
})

export const postRecordSchema = z.object({
  id: z.string(),
  author: z.string(),
  handle: z.string(),
  location: z.string().optional(),
  imageUrl: z.string().url(),
  caption: z.string(),
  comments: z.array(commentRecordSchema),
})

export const storySchema = z.object({
  id: z.string(),
  name: z.string(),
  avatarUrl: z.string().url(),
  seen: z.boolean().optional(),
})

export const feedDataSchema = z.object({
  posts: z.array(postRecordSchema),
  stories: z.array(storySchema),
})
