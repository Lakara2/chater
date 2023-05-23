import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw new Error('Adresse e-mail ou mot de passe incorrect');
  }
};

export const fetchChannels = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/channel`);
    const { channels } = response.data;
    return channels;
  } catch (error) {
    console.error("Une erreur s'est produite lors de la récupération des channels", error);
    throw error;
  }
};


export const fetchChannelMessages = async (channelId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/messages/channel/${channelId}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des messages :', error);
    throw error;
  }
};

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


export const createChannel = async (newChannel: any, token: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/channel`, newChannel, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.id;
  } catch (error) {
    throw new Error("Une erreur s'est produite lors de la création du channel.");
  }
};

export const signUpUser = async (name: string, email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/users`, {
    name,
    email,
    password,
  });
  return response.data;
};

export const updateChannel = async (channelId: string | string[] | undefined, updatedChannel: { name: string; type: string; }) => {
  try {
    await axios.put(`${BASE_URL}/api/channels/${channelId}`, updatedChannel);
  } catch (error) {
    console.error('Error updating channel:', error);
    throw new Error('Error updating channel');
  }
};


export const fetchUserMessages = async (userId: any) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/messages/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export const createUser = async (userData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const fetchChannel = async (channelId: string | string[] | undefined) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/channels/${channelId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching channel:', error);
    throw new Error('Error fetching channel');
  }
};