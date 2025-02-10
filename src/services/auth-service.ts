import { axiosInstance } from '../utils';
const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3001/api';
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT || 'development';

export interface RegisterProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contactNo: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export class AuthService {
  async register(payload: RegisterProps) {
    try {
      const result = await axiosInstance.post(
        `${BASE_URL}/register`,
        {
          ...payload,
          role: 'user',
          status: 'inactive',
        },
        {
          withCredentials: true,
        }
      );
      return result.data;
    } catch (error) {
      if (ENVIRONMENT === 'development') {
        console.error(error);
      }
    }
  }

  async login(payload: LoginProps) {
    try {
      const result = await axiosInstance.post(`${BASE_URL}/login`, {
        ...payload,
      });
      return result.data;
    } catch (error) {
      if (ENVIRONMENT === 'development') {
        console.error(error);
      }
    }
  }

  async logout() {
    try {
      const result = await axiosInstance.post(`${BASE_URL}/logout`, {
        withCredentials: true,
      });
      return result.data;
    } catch (error) {
      if (ENVIRONMENT === 'development') {
        console.error(error);
      }
    }
  }
}
