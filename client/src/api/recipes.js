import axiosApi from '../axios.js'

export const getAllRecipes = async (type, pageNumber, pageSize) => {
  try {
    const response = await axiosApi.get('/catalog', { params: { type, pageNumber, pageSize } })
    return response.data
  } catch (error) {
    throw new Error('Error fetching recipes: ' + error.message)
  }
}
