import { getOwnership } from "../services/recipeService.js";

const isRecipeOwner = async (req, res, next) => {
   const recipeId = req.params.recipeId;
   try {
      const recipe = await getOwnership({_id: recipeId});
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

export { isRecipeOwner };