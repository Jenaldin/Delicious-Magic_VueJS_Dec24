import axios from 'axios';

const API_URL = 'http://localhost:3000/api/user';

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export const logout = async () => {
  const response = await axios.get(`${API_URL}/logout`);
  return response.data;
};

export const addFavorite = async (userId, recipeId) => {
  try {
    const response = await axiosApi.patch('/user/addFav', { userId, recipeId });
    return response.data;
  } catch (error) {
    throw new Error('Error adding recipe to favorites: ' + error.message);
  }
};
