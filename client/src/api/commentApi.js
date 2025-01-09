import axiosApi from "../axios.js";

export const getAllComments = async (recipeId) => {
  const response = await axiosApi.get(`/comment/${recipeId}`);
  return response.data;
};

export const getComment = async (commentId) => {
  const response = await axiosApi.get(`/comment/${commentId}`);
  return response.data;
};

export const addComment = async (formdata) => {
  const response = await axiosApi.post("/comment/add", formdata);
  return response.data;
};

export const editComment = async (commentId, formdata) => {
  const response = await axiosApi.patch(`/comment/edit/${commentId}`, formdata);
  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await axiosApi.delete(`/comment/delete/${commentId}`);
  return response.data;
};
