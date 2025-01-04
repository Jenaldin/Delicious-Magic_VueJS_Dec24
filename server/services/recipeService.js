import mongoose from 'mongoose';
import Recipe from "../models/recipeModel.js";
import User from "../models/userModel.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const getAll = async (pageNumber, pageSize) => {
   try {
      const recipes = await Recipe.find().skip(pageNumber).limit(pageSize);
      const total = await Recipe.countDocuments();
      return { recipes, total };
   } catch (error) {
      throw new Error('Error fetching recipes: ' + error.message);
   }
};

const getOwnership = async (recipeId) => {
   try {
      if (!isValidObjectId(recipeId)) {
         throw new Error('Not a valid recipe ID.');
      }
      return await Recipe.findOne(recipeId);
   } catch (error) {
      throw new Error('Error fetching recipe ownership: ' + error.message);
   }
};

const get = async (recipeId) => {
   try {
      if (!isValidObjectId(recipeId)) {
         throw new Error('Not a valid recipe ID.');
      }
      const recipe = await Recipe.findById(recipeId).populate('owner', 'username').populate('peopleRated', 'username').lean();
      if (!recipe) { 
         throw new Error('Recipe not found.'); 
      }
      return recipe;
   } catch (error) {
      throw new Error('Error fetching recipe: ' + error.message);
   }
};

const add = async (payloadData, ownerId) => {
   try {
      const newRecipe = await Recipe.create({
         ...payloadData,
         owner: ownerId,
      });
      await User.findByIdAndUpdate(ownerId, { $push: { recipesOwned: newRecipe._id } });
      return newRecipe;
   } catch (error) {
      throw new Error('Error creating recipe: ' + error.message);
   }
};

const edit = async (recipeId, payloadData) => {
   try {
      if (!isValidObjectId(recipeId)) {
         throw new Error('Not a valid recipe ID.');
      }
      const editedRecipe = await Recipe.findByIdAndUpdate(recipeId, payloadData, { new: true, runValidators: true });
      if (!editedRecipe) { 
         throw new Error('Recipe not found.'); 
      }
      return editedRecipe;
   } catch (error) {
      throw new Error('Error editing recipe: ' + error.message);
   }
};
   
const del = async (recipeId) => {
   try {
      if (!isValidObjectId(recipeId)) {
         throw new Error('Not a valid recipe ID.');
      }
      const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
      if (!deletedRecipe) { 
         throw new Error('Recipe not found.'); 
      }
      await User.updateMany({favorites: recipeId}, { $pull: { favorites: recipeId } });
      return 'Recipe and references to it have been deleted.';
   } catch (error) {
      throw new Error('Error deleting recipe: ' + error.message);
   }
};

const rate = async (recipeId, userId, rating) => {
   try {
      if (!isValidObjectId(recipeId) || !isValidObjectId(userId)) {
         throw new Error('Not a valid recipe or user ID.');
      }
      const ratedRecipe = await Recipe.findById(recipeId);
      const user = await User.findById(userId);
      if (!ratedRecipe || !user) { 
         throw new Error('Recipe or User not found.');
      }
      if(ratedRecipe.peopleRated.includes(userId)){
         throw new Error('User has already rated this recipe.');
      }
      if(ratedRecipe.owner.equals(userId)){
         throw new Error('Owners cannot rate their own recipes.');
      }
      ratedRecipe.peopleRated.push(userId);
      ratedRecipe.averageRating = ((ratedRecipe.averageRating * (ratedRecipe.peopleRated.length - 1)) + rating) / ratedRecipe.peopleRated.length;
      await ratedRecipe.save();
      return 'Recipe rating saved successfully.';
   } catch (error) {
      throw new Error('Error rating recipe: ' + error.message);
   }
};

export { getAll, getOwnership, get, add, edit, del, rate }