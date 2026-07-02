const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/';

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
  const res = await fetch(`${API_URL}api/childs/${token}`)
  if (!res.ok) {
    if (res.status === 404) throw new Error('No record found for this token')
    throw new Error('Failed to load record')
  }
  return res.json()
}

// Admin -------------------

export async function adminLogin(username, password) {
  const res = await fetch(`${API_URL}api/admin/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || 'Invalid credentials')
  }
  return res.json() // { access_token, token_type }
}

export async function adminListChilds(token, page = 1, limit = 50) {
  const res = await fetch(`${API_URL}api/admin/childs/?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (res.status === 401) throw new Error('SESSION_EXPIRED')
  if (!res.ok) throw new Error('Failed to load records')
  return res.json()
}

export function adminPdfUrl(token, jwtToken) {
  // We'll trigger download via a hidden anchor with the JWT as a query param
  // backed by a signed URL approach — for simplicity we fetch as blob
  return { apiUrl: API_URL, token, jwtToken }
}

export async function adminDownloadPdf(recordToken, jwtToken) {
  const res = await fetch(`${API_URL}api/admin/childs/${recordToken}/pdf/`, {
    headers: { Authorization: `Bearer ${jwtToken}` },
  })
  if (res.status === 401) throw new Error('SESSION_EXPIRED')
  if (!res.ok) throw new Error('Failed to download PDF')
  const blob = await res.blob()
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${recordToken}.pdf`
  a.click()
  URL.revokeObjectURL(url)
}

