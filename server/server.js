import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import apiRouter from './routes/index.js';
import router from './router.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import errorHandler from './middlewares/errorHandlerMiddleware.js';

const app = express();
const dbUri = process.env.DB_URI || 'mongodb://127.0.0.1:27017/JennyGutevaVueJSExamProject';
const dbPort = process.env.DB_PORT || '3000';

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(authMiddleware);
app.use(errorHandler);
app.use(express.static('public'));
app.use('/api', apiRouter);
app.use(router);

mongoose.connect(dbUri);
mongoose.connection.on('connected', () => console.log('DB is Connected! Success!'));
mongoose.connection.on('disconnected', () => console.log('DB is Disconnected! Uh-ouh...'));
mongoose.connection.on('error', (err) => console.log('DB Error: ' + err));

app.listen(dbPort, () => console.log(`App is listening on http://localhost:${dbPort} ! We are good to go!`));