import axios from 'axios';
import { refreshToken } from './refresh';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3001/api';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshTokenValue = localStorage.getItem('refreshToken');
      try {
        if (refreshTokenValue) {
          const { token } = await refreshToken(refreshTokenValue);
          localStorage.setItem('token', token);
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
