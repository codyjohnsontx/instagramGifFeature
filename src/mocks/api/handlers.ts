import { delay, http, HttpResponse } from 'msw'
import { createPostedComment } from '../../features/comments/lib/commentDrafts'
import { gifCatalog, gifCatalogById } from '../data/socialData'
import { getApiState, setApiState } from './mockApiStore'

function jsonError(message: string, status = 400) {
  return HttpResponse.json({ message }, { status })
}

export const handlers = [
  http.get('/api/feed', async () => {
    await delay(120)
    const state = getApiState()

    return HttpResponse.json({
      posts: state.posts,
      stories: state.stories,
    })
  }),
  http.get('/api/gifs/search', async ({ request }) => {
    await delay(120)
    const url = new URL(request.url)
    const query = url.searchParams.get('q')?.trim().toLowerCase() ?? ''
    const items = query
      ? gifCatalog.filter((gif) => gif.title.toLowerCase().includes(query))
      : gifCatalog

    return HttpResponse.json({ items })
  }),
  http.get('/api/gifs/:gifId', async ({ params }) => {
    await delay(80)
    const gif = gifCatalogById[String(params.gifId)]

    if (!gif) {
      return jsonError('GIF not found', 404)
    }

    return HttpResponse.json(gif)
  }),
  http.get('/api/library/collections', async () => {
    await delay(80)
    const state = getApiState()

    return HttpResponse.json({ collections: state.collections })
  }),
  http.post('/api/library/collections', async ({ request }) => {
    await delay(120)
    const body = (await request.json()) as { name?: string }
    const name = body.name?.trim()

    if (!name) {
      return jsonError('Collection name is required')
    }

    const state = getApiState()
    const duplicate = state.collections.some(
      (collection) => collection.name.toLowerCase() === name.toLowerCase(),
    )

    if (duplicate) {
      return jsonError('A folder with that name already exists', 409)
    }

    const nextCollection = {
      id: `collection-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`,
      name,
      isDefault: false,
      createdAt: new Date().toISOString(),
    }

    setApiState((current) => ({
      ...current,
      collections: [...current.collections, nextCollection],
    }))

    return HttpResponse.json(nextCollection, { status: 201 })
  }),
  http.get('/api/library/saved', async ({ request }) => {
    await delay(80)
    const url = new URL(request.url)
    const collectionId = url.searchParams.get('collectionId')
    const state = getApiState()

    return HttpResponse.json({
      records: collectionId
        ? state.savedRecords.filter((record) => record.collectionId === collectionId)
        : state.savedRecords,
    })
  }),
  http.post('/api/library/save', async ({ request }) => {
    await delay(120)
    const body = (await request.json()) as {
      gifId?: string
      collectionId?: string
    }

    if (!body.gifId || !body.collectionId) {
      return jsonError('gifId and collectionId are required')
    }

    const gifId = body.gifId
    const collectionId = body.collectionId

    setApiState((current) => {
      const exists = current.savedRecords.some(
        (record) =>
          record.gifId === gifId && record.collectionId === collectionId,
      )

      if (exists) {
        return current
      }

      return {
        ...current,
        savedRecords: [
          {
            gifId,
            collectionId,
            savedAt: new Date().toISOString(),
          },
          ...current.savedRecords,
        ],
      }
    })

    return new HttpResponse(null, { status: 204 })
  }),
  http.post('/api/library/remove', async ({ request }) => {
    await delay(120)
    const body = (await request.json()) as {
      gifId?: string
      collectionId?: string
    }

    if (!body.gifId) {
      return jsonError('gifId is required')
    }

    setApiState((current) => ({
      ...current,
      savedRecords: current.savedRecords.filter((record) => {
        if (record.gifId !== body.gifId) {
          return true
        }

        if (!body.collectionId) {
          return false
        }

        return record.collectionId !== body.collectionId
      }),
    }))

    return new HttpResponse(null, { status: 204 })
  }),
  http.post('/api/library/move', async ({ request }) => {
    await delay(120)
    const body = (await request.json()) as {
      gifId?: string
      fromCollectionId?: string
      toCollectionId?: string
    }

    if (!body.gifId || !body.fromCollectionId || !body.toCollectionId) {
      return jsonError('gifId, fromCollectionId, and toCollectionId are required')
    }

    const gifId = body.gifId
    const fromCollectionId = body.fromCollectionId
    const toCollectionId = body.toCollectionId

    setApiState((current) => {
      const nextSaved = current.savedRecords.filter(
        (record) =>
          !(
            record.gifId === gifId &&
            record.collectionId === fromCollectionId
          ),
      )
      const exists = nextSaved.some(
        (record) =>
          record.gifId === gifId &&
          record.collectionId === toCollectionId,
      )

      return {
        ...current,
        savedRecords: exists
          ? nextSaved
          : [
              {
                gifId,
                collectionId: toCollectionId,
                savedAt: new Date().toISOString(),
              },
              ...nextSaved,
            ],
      }
    })

    return new HttpResponse(null, { status: 204 })
  }),
  http.post('/api/comments', async ({ request }) => {
    await delay(120)
    const body = (await request.json()) as {
      postId?: string
      draft?: import('../../types').CommentDraft
    }

    if (!body.postId || !body.draft) {
      return jsonError('postId and draft are required')
    }

    const state = getApiState()
    const targetPost = state.posts.find((post) => post.id === body.postId)

    if (!targetPost) {
      return jsonError('Post not found', 404)
    }

    const nextPost = {
      ...targetPost,
      comments: [...targetPost.comments, createPostedComment(body.draft)],
    }

    setApiState((current) => ({
      ...current,
      posts: current.posts.map((post) => (post.id === body.postId ? nextPost : post)),
    }))

    return HttpResponse.json(nextPost, { status: 201 })
  }),
]
