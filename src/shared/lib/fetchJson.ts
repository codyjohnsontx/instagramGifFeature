export async function fetchJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(input, init)

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`

    try {
      const errorBody = (await response.json()) as { message?: string }
      if (typeof errorBody.message === 'string') {
        message = errorBody.message
      }
    } catch {
      // Ignore malformed error payloads and surface the status-based fallback.
    }

    throw new Error(message)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}
