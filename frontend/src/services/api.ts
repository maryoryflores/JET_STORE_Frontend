import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('jetstore-auth');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.state?.token) {
            config.headers.Authorization = `${parsed.state.token}`;
          }
        } catch {
          // ignore
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('jetstore-auth');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
