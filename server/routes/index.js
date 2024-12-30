import express from 'express';
import auth from './authRoute';
const apiRouter = express.Router();

apiRouter.use('/user', auth);

export default apiRouter;