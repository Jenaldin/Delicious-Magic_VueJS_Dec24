import { getAll, get, add, edit, del, rate } from "../services/recipeService.js";

const getAllRecipes = async (req, res) => {
   try {
      const type = req.query.type;
      const pageNumber = Number(req.query.pageNumber);
      const pageSize = Number(req.query.pageSize);
      const items = await getAll(type, pageNumber, pageSize);
      res.status(200).json({recipes: items.recipes, total: items.total});
   } catch (error) {
      console.error('An error occurred:', error);
      if (error.name === 'ValidationError') {
         res.status(400).json({error: error.message});
      } else if (error.name === 'CastError') {
         res.status(400).json({error: 'Invalid ID format'});
      } else {
         res.status(500).json({error: 'Internal server error: ' + error.message});
      }
   }
};

const getRecipe = async (req, res) => {
   try {
      const item = await get(req.params.recipeId);
      res.status(200).json(item)
   } catch (error) {
      console.error('An error occurred:', error);
      if (error.message.includes('Not a valid recipe ID')) {
         res.status(400).json({ error: error.message });
      } else if (error.message.includes('Recipe not found')) {
         res.status(404).json({ error: error.message });
      } else {
         res.status(500).json({ error: 'Internal server error: ' + error.message });
      }
   }
};

const addRecipe = async (req, res) => {
   const payloadData = req.body;
   const ownerId = req.user._id;
   try {
      await add(payloadData, ownerId);
      res.status(201).json({message: 'Recipe added successfully'})
   } catch (error) {
      console.error('An error occurred:', error);
      if (error.message.includes('Error creating recipe')) {
         res.status(400).json({ error: error.message });
      } else {
         res.status(500).json({ error: 'Internal server error: ' + error.message });
      }
   }
};

const editRecipe = async (req, res) => {
   const payloadData = req.body;
   const { recipeId } = req.params;
   try {
      await edit(recipeId, payloadData);
      res.status(200).json({message: 'Recipe edited successfully'})
   } catch (error) {
      console.error('An error occurred:', error);
      if (error.message.includes('Not a valid recipe ID')) {
         res.status(400).json({ error: error.message });
      } else if (error.message.includes('Recipe not found')) {
         res.status(404).json({ error: error.message });
      } else {
         res.status(500).json({ error: 'Internal server error: ' + error.message });
      }
   }
};

const deleteRecipe = async (req, res) => {
   const { recipeId } = req.params;
   try {
      await del(recipeId);
      res.status(200).json({message: 'Recipe and references to it have been deleted.'})
   } catch (error) {
      console.error('An error occurred:', error);
      if (error.message.includes('Not a valid recipe ID')) {
         res.status(400).json({ error: error.message });
      } else if (error.message.includes('Recipe not found')) {
         res.status(404).json({ error: error.message });
      } else {
         res.status(500).json({ error: 'Internal server error: ' + error.message });
      }
   }
};

const rateRecipe = async (req, res) => {
   const { recipeId } = req.params;
   const { userId, rating } = req.body;
   try {
      await rate(recipeId, userId, rating);
      res.status(200).json({ message: 'Recipe rating saved successfully' });
   } catch (error) {
      console.error('An error occurred:', error);
      if (error.message.includes('Not a valid recipe or user ID')) {
         res.status(400).json({ error: error.message });
      } else if (error.message.includes('Recipe or User not found')) {
         res.status(404).json({ error: error.message });
      } else if (error.message.includes('User has already rated this recipe')) {
         res.status(409).json({ error: error.message });
      } else if (error.message.includes('Owners cannot rate their own recipes')) {
         res.status(403).json({ error: error.message });
      } else {
         res.status(500).json({ error: 'Internal server error: ' + error.message });
      }
   }
};

export { getAllRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, rateRecipe };
