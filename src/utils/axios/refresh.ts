import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3001/api';

export const refreshToken = async (refreshToken: string) => {
  try {
    const result = await axios.post(`${BASE_URL}/token`, {
      token: refreshToken,
    });
    return result.data;
  } catch (error) {
    console.error('Error in refreshing token:', error);
    throw error;
  }
};
