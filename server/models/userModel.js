import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const saltRounds = Number(process.env.SALT) || 10;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    match: [/^[a-zA-Z0-9_-]+$/, "Invalid username"],
    minlength: [3, "Username should be at least 3 characters"],
    maxlength: [10, "Username should be no more than 10 characters"],
    required: [true, "Username is required"],
    unique: true,
  },
  email: {
    type: String,
    minlength: [5, "Email should be at least 5 characters"],
    maxlength: [15, "Email should be no more than 15 characters"],
    lowercase: true,
    required: [true, "Email is required"],
    validate: {
      validator: validator.isEmail,
      message: "Invalid email",
    },
  },
  password: {
    type: String,
    minlength: [4, "Password should be at least 4 characters"],
    maxlength: [12, "Password should be no more than 12 characters"],
    required: [true, "Password is required"],
  },
  avatar: {
    type: String,
    validate: {
      validator: function (value) {
        return (
          value === "" ||
          (validator.isURL(value) &&
            /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(value))
        );
      },
      message: "Invalid avatar link",
    },
    required: false,
  },
  aboutMe: {
    type: String,
    maxlength: [500, "About me maximal length is 500 symbols"],
    default: " ",
  },
  recipesOwned: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Recipe",
    },
  ],
  favorites: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Recipe",
    },
  ],
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, saltRounds);
});

const User = mongoose.model("User", userSchema);
export default User;
