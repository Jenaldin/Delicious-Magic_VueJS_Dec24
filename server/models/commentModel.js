import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: [5, "Comment title minimal length is 5 symbol"],
    maxlength: [100, "Comment title maximal length is 100 symbols"],
    required: [true, "Comment title content is required"],
  },
  body: {
    type: String,
    minlength: [10, "Comment message minimal length is 10 symbol"],
    maxlength: [500, "Comment message maximal length is 500 symbols"],
    required: [true, "Comment message is required"],
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  recipe: {
    type: mongoose.Types.ObjectId,
    ref: "Recipe",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
