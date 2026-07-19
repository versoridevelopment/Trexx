const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  'http://localhost:3001'

interface ApiFetchOptions {
  accessToken?: string
  method?: string
  body?: unknown
}

export async function apiFetch<T>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const { accessToken, method = 'GET', body } = options

  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData

  const headers: Record<string, string> = {}
  
  if (!isFormData) {
    headers['Content-Type'] = 'application/json'
  }

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: isFormData ? (body as FormData) : body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  })

  if (!res.ok) {
    const errorBody = await res.json().catch(async () => {
      const text = await res.text().catch(() => '')
      return { message: text || `HTTP ${res.status} ${res.statusText}` }
    })

    const message = Array.isArray(errorBody?.message)
      ? errorBody.message.join(', ')
      : errorBody?.message || errorBody?.error || `HTTP ${res.status}`

    throw new Error(message)
  }

  return res.json()
}
