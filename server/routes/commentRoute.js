import express from "express";
import {
  getAllComments,
  getComment,
  addComment,
  editComment,
  deleteComment,
} from "../controllers/commentController.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { isCommentOwner } from "../middlewares/ownerMiddleware.js";

const router = express.Router();

router.get("/:recipeId", getAllComments);
router.get("/:commentId", getComment);
router.post("/add", isAuth, addComment);
router.patch("/edit/:commentId", isCommentOwner, editComment);
router.delete("/delete/:commentId", isCommentOwner, deleteComment);

export default router;
