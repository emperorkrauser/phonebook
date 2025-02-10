import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export class ContactService {
  async browseAll() {
    try {
      const result = await axios.get(`${BASE_URL}/user`);
      return result.data;
    } catch (error) {
      console.error(error);
    }
  }
}
