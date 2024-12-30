import bcrypt from "bcrypt";
import { generateToken } from "../utils/tkn";
import userModel from "../models/userModel";

export const register = async (userData) => {
  try {
    if (userData.password !== userData.rePass) {
      throw new Error("Password mismatch");
    }

    const user = await userModel.findOne({ username: userData.username });
    if (user) {
      throw new Error("Already exists!");
    }

    const createdUser = await userModel.create(userData);
    const token = await generateToken(createdUser);
    return { token, username: createdUser.username, id: createdUser._id };
  } catch (error) {
    throw new Error("Error registering a user: " + error.message);
  }
};

export const login = async ({ username, password }) => {
  try {
    const user = await userModel.findOne({ username });
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
    throw new Error("Error logging in a user: " + error.message);
  }
};
