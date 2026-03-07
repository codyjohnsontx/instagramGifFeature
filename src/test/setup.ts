import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { resetMockFeedStore } from '../mocks/data/mockFeedStore'
import { server } from '../mocks/api/server'
import { resetApiState } from '../mocks/api/mockApiStore'

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
  cleanup()
  window.localStorage.clear()
  resetMockFeedStore()
  resetApiState()
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
