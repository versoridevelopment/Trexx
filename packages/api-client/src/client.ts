const API_URL = process.env.API_URL ?? 'http://127.0.0.1:3001'

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

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'API error' }))
    throw new Error(error.message ?? `HTTP ${res.status}`)
  }

  return res.json()
}
