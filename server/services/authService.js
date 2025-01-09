import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import { generateToken } from "../utils/tkn.js";
import User from "../models/userModel.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const register = async (userData) => {
  try {
    if (userData.password !== userData.repassword) {
      throw new Error("Password mismatch");
    }
    const user = await User.findOne({ username: userData.username });
    if (user) {
      throw new Error("Already exists!");
    }
    const createdUser = await User.create(userData);
    const token = await generateToken(createdUser);
    return { token, username: createdUser.username, id: createdUser._id };
  } catch (error) {
    console.error('An error occurred:', error);
    throw new Error("Error registering a user: " + error.message);
  }
};

const login = async ({ username, password }) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Login or password is invalid");
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Login or password is invalid");
    }
    const token = await generateToken(user);
    return { token, username: user.username, id: user._id };
  } catch (error) {
    console.error('An error occurred:', error);
    throw new Error("Error logging in a user: " + error.message);
  }
};

const getOwner = async (userId) => {
  try {
    if (!isValidObjectId(userId)) {
       throw new Error('Not a valid user ID.');
    }
    return await User.findOne({ _id: userId });
 } catch (error) {
  console.error('An error occurred:', error);
    throw new Error('Error fetching profile ownership: ' + error.message);
 }
};

const get = async (userId) => {
  try {
    if (!isValidObjectId(userId)) {
       throw new Error('Not a valid user ID.');
    }
    const user = await User.findById(userId).populate('recipesOwned', 'title _id type image createdAt').populate('favorites', 'title _id type image createdAt').lean();
    if (!user) { 
       throw new Error('User not found.'); 
    }
    return user;
 } catch (error) {
  console.error('An error occurred:', error);
    throw new Error('Error fetching profile: ' + error.message);
 }
};

const edit = async (userId, payloadData) => {
  try {
    if (!isValidObjectId(userId)) {
       throw new Error('Not a valid user ID.');
    }
    const editedUser = await User.findByIdAndUpdate(userId, payloadData, { runValidators: true });
    if (!editedUser) { 
       throw new Error('User not found.'); 
    }
    return editedUser;
 } catch (error) {
  console.error('An error occurred:', error);
    throw new Error('Error editing profile: ' + error.message);
 }
};

const favorites = async (userId, recipeId) => {
  try {   
    if(!isValidObjectId(userId) || !isValidObjectId(recipeId)){
      throw new Error('Not a valid user or recipe ID.');
  }
    const user = await User.findById(userId);
    if (!user) { 
      throw new Error('User not found.'); 
    }
    if(user.favorites.includes(recipeId)){
      throw new Error('Recipe already in favorites.')
    }
    await User.findByIdAndUpdate(userId, { $push: { favorites: recipeId }});
    return 'Recipe added to favorites successfully.'
  } catch (error) {
    console.error('An error occurred:', error);
    console.log(error.message);
    throw new Error('Error adding recipe to favorites: ' + error.message)
  }
};

export { register, login, get, edit, favorites, getOwner }