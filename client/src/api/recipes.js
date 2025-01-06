import axiosApi from '../axios.js'

export const getAllRecipes = async (pageNumber, pageSize) => {
  try {
    const response = await axiosApi.get('/catalog', { params: { pageNumber, pageSize } })
    return response.data
  } catch (error) {
    throw new Error('Error fetching recipes: ' + error.message)
  }
}
