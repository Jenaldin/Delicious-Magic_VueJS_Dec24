import axiosApi from "../axios.js";

export const getAllRecipes = async (type, pageNumber, pageSize) => {
  const response = await axiosApi.get("/catalog", {
    params: { type, pageNumber, pageSize },
  });
  return response.data;
};

export const getRecipe = async (recipeId) => {
  const response = await axiosApi.get(`/catalog/${recipeId}`);
  return response.data;
};

export const addRecipe = async (formdata) => {
  const response = await axiosApi.post("/catalog/add", formdata);
  return response.data;
};

export const editRecipe = async (recipeId, formdata) => {
  const response = await axiosApi.put(`/catalog/edit/${recipeId}`, formdata);
  return response.data;
};

export const deleteRecipe = async (recipeId) => {
  const response = await axiosApi.delete(`/catalog/delete/${recipeId}`);
  return response.data;
};

export const rateRecipe = async (recipeId, userId, rating) => {
  const response = await axiosApi.put(`/catalog/rate/${recipeId}`, {
    userId,
    rating,
  });
  return response.data;
};
