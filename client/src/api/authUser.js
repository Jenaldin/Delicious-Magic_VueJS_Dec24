import axios from 'axios';
import axiosApi from '../axios.js'

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
  const response = await axiosApi.put(`/user/addFav`, { userId, recipeId });
  return response.data;
};
