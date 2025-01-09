import { sign } from "./jwt.js";
const secret =
  process.env.SECRET ||
  "vape1097#%%#34yhx148fiuwehfi&*@ushering9357m30945rc1mh19";

export function generateToken(user) {
  const payload = {
    _id: user._id,
    username: user.username,
  };
  return sign(payload, secret, { expiresIn: "3h" });
}
