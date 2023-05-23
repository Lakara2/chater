import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const signup = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, {
      name,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
