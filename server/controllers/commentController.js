import { getAll, get, add, edit, del } from '../services/commentService.js';

const getAllComments = async (req, res) => {
   try {
      let pageNumber = Number(req.query.pageNumber) || 0;
      const pageSize = Number(req.query.pageSize) || 10;
      const items = await getAll(pageNumber, pageSize);
      res.status(200).json({comments: items.comments, total: items.total});
   } catch (error) {
      if (error.name === 'ValidationError') {
         res.status(400).json({error: error.message});
      } else if (error.name === 'CastError') {
         res.status(400).json({error: 'Invalid ID format'});
      } else {
         res.status(500).json({error: 'Internal server error: ' + error.message});
      }
   }
};

const getComment = async (req, res) => {
   try {
      const item = await get(req.params.commentId);
      res.status(200).json(item)
   } catch (error) {
      if (error.message.includes('Not a valid comment ID')) {
         res.status(400).json({ error: error.message });
      } else if (error.message.includes('Comment not found')) {
         res.status(404).json({ error: error.message });
      } else {
         res.status(500).json({ error: 'Internal server error: ' + error.message });
      }
   }
};

const addComment = async (req, res) => {
   const payloadData = req.body;
   const ownerId = req.user._id;
   try {
      await add(payloadData, ownerId);
      res.status(201).json({message: 'Comment added successfully'});
   } catch (error) {
      if (error.message.includes('Error creating comment')) {
         res.status(400).json({ error: error.message });
      } else {
         res.status(500).json({ error: 'Internal server error: ' + error.message });
      }
   }
};

const editComment = async (req, res) => {
   const payloadData = req.body;
   const { commentId } = req.params;
   try {
      await edit(commentId, payloadData);
      res.status(200).json({message: 'Comment edited successfully'});
   } catch (error) {
      if (error.message.includes('Not a valid comment ID')) {
         res.status(400).json({ error: error.message });
      } else if (error.message.includes('Comment not found')) {
         res.status(404).json({ error: error.message });
      } else {
         res.status(500).json({ error: 'Internal server error: ' + error.message });
      }
   }
};

const deleteComment = async (req, res) => {
   const { commentId } = req.params;
   try {
      await del(commentId);
      res.status(200).json( {message: 'Comment and references to it have been deleted.'} );
   } catch (error) {
      if (error.message.includes('Not a valid comment ID')) {
         res.status(400).json({ error: error.message });
      } else if (error.message.includes('Comment not found')) {
         res.status(404).json({ error: error.message });
      } else {
         res.status(500).json({ error: 'Internal server error: ' + error.message });
      }
   }
};

export { getAllComments, getComment, addComment, editComment, deleteComment };
