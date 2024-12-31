import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import apiRouter from './routes/index.js';
import router from './router.js';
import { authMiddleware } from './middlewares/authMiddleware.js';

const app = express();
const dbUri = process.env.DB_URI || 'mongodb://127.0.0.1:27017/JennyGutevaVueJSExamProject';
const dbPort = process.env.DB_PORT || '3000';

app.use(cors({ origin: ' ', credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(authMiddleware);
app.use(express.static('public'));
app.use('/api', apiRouter);
app.use(router);

mongoose.connect(dbUri);
mongoose.connection.on('connected', () => console.log('DB is Connected!'));
mongoose.connection.on('disconnected', () => console.log('DB is Disconnected!'));
mongoose.connection.on('error', (err) => console.log('DB Error: ' + err));

app.listen(dbPort, () => console.log(`App is listening on http://localhost:${dbPort}`));