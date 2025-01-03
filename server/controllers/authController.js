import { register, login } from "../services/authService.js";

const registerUser = async (req, res) => {
  const userData = req.body;
  
  try {
    const result = await register(userData);
    const { token, username, id } = result;
    res
      .status(201)
      .json({ message: "Registration successful", token, username, id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const loginData = req.body;
  try {
    const result = await login(loginData);
    const { token, username, id } = result;
    res.status(200).json({ message: "Login successful", token, username, id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("auth");
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export { registerUser, loginUser, logoutUser };
