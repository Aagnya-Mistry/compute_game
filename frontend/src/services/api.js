import axios from 'axios';

// Priority order for base URL:
// 1. Environment variable from Vercel/local .env (REACT_APP_API_URL or REACT_APP_BACKEND_URL)
// 2. Production Render URL
// 3. Local development fallback
const API_BASE_URL = 
  process.env.REACT_APP_API_URL || 
  process.env.REACT_APP_BACKEND_URL || 
  'https://compute-game.onrender.com';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Log the base URL in development to help with debugging
if (process.env.NODE_ENV === 'development') {
  console.log('[API] Using base URL:', API_BASE_URL);
}

// API endpoints
export const mediaApi = {
  getRandomMedia: (sessionId) => 
    api.get('/api/random-media', {
      headers: { 'session-id': sessionId }
    }),
  resetSession: (sessionId) =>
    api.post('/api/reset-session', null, {
      headers: { 'session-id': sessionId }
    })
};

export default api;