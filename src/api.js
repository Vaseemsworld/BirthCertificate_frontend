const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function createChild(payload) {
  const res = await fetch(`${API_URL}api/childs/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || 'Failed to submit registration')
  }
  return res.json()
}

export async function getChild(token) {
  const res = await fetch(`${API_URL}/api/childs/${token}`)
  if (!res.ok) {
    if (res.status === 404) throw new Error('No record found for this token')
    throw new Error('Failed to load record')
  }
  return res.json()
}
