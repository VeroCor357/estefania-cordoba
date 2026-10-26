import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api-scgea.ejercito.mil.ar/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para Token JWT institucional de C#
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('scgea_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta con manejo de errores institucional
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirigir a login institucional si el token expiró
      console.warn('Sesión expirada o no autorizada');
    }
    return Promise.reject(error);
  }
);
