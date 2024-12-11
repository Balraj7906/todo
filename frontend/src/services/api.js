import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Request made but no response
      return Promise.reject({ message: 'No response from server' });
    } else {
      // Something else went wrong
      return Promise.reject({ message: 'Request failed' });
    }
  }
);

let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export const auth = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/auth/register', userData),
};

export const todos = {
  getAll: () => api.get('/api/todos'),
  create: (todo) => api.post('/api/todos', todo),
  update: (id, todo) => api.put(`/api/todos/${id}`, todo),
  delete: (id) => api.delete(`/api/todos/${id}`),
  toggle: (id) => api.patch(`/api/todos/${id}/toggle`),
};

export default api;
