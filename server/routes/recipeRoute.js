import express from 'express';
import { getAllRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, rateRecipe } from "../controllers/recipeController.js"
import { isAuth } from '../middlewares/authMiddleware.js';
import { isRecipeOwner } from '../middlewares/ownerMiddleware.js';

const router = express.Router();

router.get('/', getAllRecipes);
router.get('/:recipeId', getRecipe);
router.post('/add', isAuth, addRecipe);
router.patch('/rate/:recipeId', isAuth, rateRecipe);
router.patch('/edit/:recipeId', isRecipeOwner, editRecipe);
router.delete('/delete/:recipeId', isRecipeOwner, deleteRecipe);

export default router;