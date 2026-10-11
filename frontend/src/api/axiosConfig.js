import axios from 'axios'

// One shared Axios instance. Every request starts with this base URL.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000, // give up after 10 seconds
})

// Turns any error into one readable message for the UI.
export function getErrorMessage(error) {
  if (error.response) {
    // Backend answered with an error (400, 404, 409, 500...)
    const data = error.response.data
    if (data && data.fieldErrors) {
      return Object.values(data.fieldErrors).join(', ')
    }
    return (data && data.message) || 'Request failed'
  }
  if (error.request) {
    // No answer at all: backend is off or CORS blocked it
    return 'Cannot reach the server. Is the backend running on port 8080?'
  }
  return error.message
}

export default api