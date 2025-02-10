import { BaseProps } from '../components';
import { axiosInstance } from '../utils';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export interface UserProps extends Partial<BaseProps> {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  status?: string;
  contactNo?: string;
  contacts?: string[];
}

export class UserService {
  async browseAll(payload: UserProps) {
    try {
      const result = await axiosInstance.get(`${BASE_URL}/user`, {
        params: payload,
      });
      return result.data;
    } catch (error) {
      console.error(error);
    }
  }

  async browseOne(uuid: string) {
    try {
      const result = await axiosInstance.get(`${BASE_URL}/user/${uuid}`);
      return result.data;
    } catch (error) {
      console.error(error);
    }
  }

  async updateOne(uuid: string, payload: UserProps) {
    try {
      const result = await axiosInstance.put(
        `${BASE_URL}/user/edit/${uuid}`,
        payload
      );
      return result.data;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteOne(uuid: string) {
    try {
      const result = await axiosInstance.put(`${BASE_URL}/user/delete/${uuid}`);
      return result.data;
    } catch (error) {
      console.error(error);
    }
  }
}
