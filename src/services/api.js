import { API_BASE_URL } from '../utils/constants'

export async function apiRequest(path, options = {}) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), options.timeout || 15000)
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    })
    const text = await response.text()
    let data = null
    try { data = text ? JSON.parse(text) : null } catch { data = text }
    if (!response.ok) throw new Error(data?.message || `Request failed (${response.status})`)
    return data
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('Request timed out. Please try again.')
    throw error
  } finally { clearTimeout(timeout) }
}
