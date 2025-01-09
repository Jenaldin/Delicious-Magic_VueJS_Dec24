import mongoose from "mongoose";
import Comment from "../models/commentModel.js";
import Recipe from "../models/recipeModel.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const getAll = async (recipeId) => {
  try {
    const comments = await Comment.find({ recipe: recipeId })
      .populate("owner", "username avatar")
      .lean();
    comments.sort((a, b) => b.createdAt - a.createdAt);
    return comments;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("Error fetching comments: " + error.message);
  }
};

const get = async (commentId) => {
  try {
    if (!isValidObjectId(commentId)) {
      throw new Error("Not a valid comment ID.");
    }
    const comment = await Comment.findById(commentId)
      .populate("owner", "username avatar")
      .lean();
    if (!comment) {
      throw new Error("Comment not found.");
    }
    return comment;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("Error fetching comment: " + error.message);
  }
};

const getOwnerComm = async (commentId) => {
  try {
    if (!isValidObjectId(commentId)) {
      throw new Error("Not a valid comment ID.");
    }
    return await Comment.findOne({ _id: commentId });
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("Error fetching comment ownership: " + error.message);
  }
};

const add = async (payloadData, ownerId) => {
  try {
    const newComment = await Comment.create({ ...payloadData, owner: ownerId });
    await Recipe.findByIdAndUpdate(payloadData.recipe, {
      $push: { comments: newComment._id },
    });
    return newComment;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("Error adding comment: " + error.message);
  }
};

const edit = async (commentId, payloadData) => {
  try {
    if (!isValidObjectId(commentId)) {
      throw new Error("Not a valid comment ID.");
    }
    const editedComment = await Comment.findByIdAndUpdate(
      commentId,
      payloadData,
      { runValidators: true }
    );
    if (!editedComment) {
      throw new Error("Comment not found.");
    }
    return editedComment;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("Error editing comment: " + error.message);
  }
};

const del = async (commentId) => {
  try {
    if (!isValidObjectId(commentId)) {
      throw new Error("Not a valid comment ID.");
    }
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      throw new Error("Comment not found.");
    }
    await Recipe.updateMany(
      { comments: commentId },
      { $pull: { comments: commentId } }
    );
    return "Comment deleted successfully.";
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("Error deleting comment: " + error.message);
  }
};

export { 
  getAll, 
  get, 
  getOwnerComm, 
  add, 
  edit, 
  del 
};
