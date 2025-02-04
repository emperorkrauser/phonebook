import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export interface RegisterProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contactNo: string;
}

export class AuthService {
  async register(payload: RegisterProps) {
    try {
      const result = await axios.post(
        `${BASE_URL}/register`,
        {
          ...payload,
          role: 'user',
          status: 'active',
        },
        {
          withCredentials: true,
        }
      );
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
