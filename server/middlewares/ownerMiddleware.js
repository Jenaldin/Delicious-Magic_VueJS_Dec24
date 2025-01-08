import { getOwnership } from "../services/recipeService.js";
import { getOwner } from "../services/authService.js";
import { getOwnerComm } from "../services/commentService.js";

const isRecipeOwner = async (req, res, next) => {
   const recipeId = req.params.recipeId;
   try {         
      const recipe = await getOwnership(recipeId);      
      if (!recipe) {
         return res.status(404).json({ error: 'Recipe not found.' });
      }
      if (recipe.owner.toString() !== req.user._id.toString()) {
         return res.status(403).json({ error: 'Not authorized to edit/delete this recipe.' });
      }      
      req.recipe = recipe;
      next();
   } catch (error) {
      res.status(500).json({ error: 'Internal server error: ' + error.message });
   }
};

const isProfileOwner = async (req, res, next) => {
   const userId = req.params.userId;   
   try {
      const user = await getOwner(userId);
      if (!user) {
         return res.status(404).json({ error: 'User not found.' });
      }
      if (user._id.toString() !== req.user._id.toString()) {
         return res.status(403).json({ error: 'Not authorized to edit/delete this profile.' });
      }
      req.user = user;
      next();
   } catch (error) {
      res.status(500).json({ error: 'Internal server error: ' + error.message });
   }
};

const isCommentOwner = async (req, res, next) => {
   const commentId = req.params.commentId;
   try {
      const comment = await getOwnerComm(commentId);
      if (!comment) {
         return res.status(404).json({ error: 'Comment not found.' });
      }
      if (comment.owner.toString() !== req.user._id.toString()) {
         return res.status(403).json({ error: 'Not authorized to edit/delete this comment.' });
      }
      req.comment = comment;
      next();
   } catch (error) {
      res.status(500).json({ error: 'Internal server error: ' + error.message });
   }
};

export { isRecipeOwner, isProfileOwner, isCommentOwner };