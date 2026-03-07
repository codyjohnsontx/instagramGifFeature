import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import { createServices } from '../../../app/createServices'
import { server } from '../../../mocks/api/server'

describe('GIF repositories', () => {
  it('supports creating folders and moving GIFs with the mock repositories', async () => {
    const services = createServices('mock')
    const initialCollections = await services.gifLibraryRepository.listCollections()
    const folder = await services.gifLibraryRepository.createCollection({
      name: 'Moodboard',
    })

    await services.gifLibraryRepository.saveGif({
      gifId: 'shocked',
      collectionId: folder.id,
    })

    let savedInFolder = await services.gifLibraryRepository.listSaved({
      collectionId: folder.id,
    })
    expect(savedInFolder.some((record) => record.gifId === 'shocked')).toBe(true)

    await services.gifLibraryRepository.moveGif({
      gifId: 'shocked',
      fromCollectionId: folder.id,
      toCollectionId: initialCollections[0].id,
    })

    savedInFolder = await services.gifLibraryRepository.listSaved({
      collectionId: folder.id,
    })
    const savedInDefault = await services.gifLibraryRepository.listSaved({
      collectionId: initialCollections[0].id,
    })

    expect(savedInFolder.some((record) => record.gifId === 'shocked')).toBe(false)
    expect(savedInDefault.some((record) => record.gifId === 'shocked')).toBe(true)
  })

  it('supports the same folder flow through the api repositories', async () => {
    const services = createServices('api')
    const folder = await services.gifLibraryRepository.createCollection({
      name: 'Campaign',
    })

    await services.gifLibraryRepository.saveGif({
      gifId: 'wow',
      collectionId: folder.id,
    })

    const savedInFolder = await services.gifLibraryRepository.listSaved({
      collectionId: folder.id,
    })

    expect(savedInFolder.some((record) => record.gifId === 'wow')).toBe(true)
  })

  it('validates malformed api payloads at runtime', async () => {
    const services = createServices('api')

    server.use(
      http.get('/api/library/collections', () =>
        HttpResponse.json({
          collections: [{ id: 1, name: 'Broken' }],
        }),
      ),
    )

    await expect(services.gifLibraryRepository.listCollections()).rejects.toThrow()
  })
})
