import { register, login, get, edit, favorites } from "../services/authService.js";

const registerUser = async (req, res) => {
  const userData = req.body;
  try {
    const result = await register(userData);
    const { token, username, id } = result;
    res.status(200).json({ message: "Registration successful", token, username, id });
  } catch (error) {
    console.error('An error occurred:', error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: 'Invalid data: ' + error.message });
    } else if (error.code === 11000) { 
      res.status(409).json({ error: 'Username or email already exists' });
    } else {
      res.status(500).json({ error: 'Internal server error: ' + error.message });
    }
  }
};

const loginUser = async (req, res) => {
  const loginData = req.body;
  try {
    const result = await login(loginData);
    const { token, username, id } = result;
    res.status(200).json({ message: "Login successful", token, username, id });
  } catch (error) {
    console.error('An error occurred:', error);
    if (error.message === 'Invalid credentials') {
      res.status(401).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error: ' + error.message });
    }
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("auth");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await get(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    console.error('An error occurred:', error);
    if (error.message.includes('Not a valid user ID')) {
      res.status(400).json({ error: error.message });
    } else if (error.message.includes('User not found')) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error: ' + error.message });
    }
  }
};

const editUser = async (req, res) => {
  const payloadData = req.body;
  const { userId } = req.params;
  try {
     await edit(userId, payloadData);
     res.status(200).json({message: 'Profile edited successfully'})
  } catch (error) {
    console.error('An error occurred:', error);
     if (error.message.includes('Not a valid user ID')) {
        res.status(400).json({ error: error.message });
     } else if (error.message.includes('User not found')) {
        res.status(404).json({ error: error.message });
     } else {
        res.status(500).json({ error: 'Internal server error: ' + error.message });
     }
  }
};

const addFavorite = async (req, res) => {
  const { userId, recipeId } = req.body;
  try {
    await favorites(userId, recipeId);
    res.status(200).json({message: 'Recipe added to favorites successfully'})
  } catch (error) {
    console.error('An error occurred:', error);
    if (error.message.includes('Not a valid user or recipe ID')) {
      res.status(400).json({ error: error.message });
   } else if (error.message.includes('User not found')) {
      res.status(404).json({ error: error.message });
   } else if (error.message.includes('Recipe already in favorites')) {
      res.status(409).json({ error: error.message });
   } else {
      res.status(500).json({ error: 'Internal server error: ' + error.message });
   }
  }
};

export { registerUser, loginUser, logoutUser, getUser, editUser, addFavorite };
