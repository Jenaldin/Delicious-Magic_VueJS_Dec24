import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
   title: {
      type: String,
      minlength: [5, 'Title minimal length is 5 symbols'],
      maxlength: [100, 'Title maximum length is 100 symbols'],
      required: [true, 'Title is required'],
   },
   type: { 
      type: String, 
      enum: { 
         values: ['food', 'drink'], 
         message: 'Type can be only food or drink'
      },
      required: [true, 'Type is required']
   },
   ingredients: [{ 
      type: String, 
      required: true 
   }], 
   steps: [{ 
      type: String, 
      required: true 
   }], 
   prepTime: { 
      type: Number, 
      required: true 
   }, 
   portions: { 
      type: Number, 
      required: true 
   },
   owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
   },
   averageRating:{
      type: Number,
      max: 5,
   },
   peopleRated: [{
      type: mongoose.Types.ObjectId,
      ref: 'User',
   }],
   comments: [{
      type: mongoose.Types.ObjectId,
      ref: 'Comment'
   }],
   createdAt: {
      type: Date,
      default: Date.now
   },
});

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;