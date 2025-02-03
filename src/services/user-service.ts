import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export class UserService {
  async browseAll() {
    try {
      const result = await axios.get(`${BASE_URL}/user`);
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
