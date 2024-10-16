import dotenv from 'dotenv';
dotenv.config();

// Server
import express from 'express';
import ViteExpress from 'vite-express';
let API_URL = process.env.VITE_API_URL;

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

import cors from 'cors';
app.use(cors());

// Storage & DB
import { connectCloudinary } from './config/Cloudinary/Cloudinary.js';
import connectDB from './config/MongoDB/connectDB.js';

connectCloudinary();
connectDB();

// Router API
import userRouter from './api/routes/users.routes.js';
import dbRouter from './api/routes/db.routes.js';
app.use('/api/users', userRouter);
app.use('/api/data', dbRouter);

// Middleware API Routes Not Found
import { excludeRoutes } from './utils/routes-excluder.js';
import { APIRouteNotFound } from './middlewares/API-routes-not-found.js';
app.use('/api', excludeRoutes(APIRouteNotFound, ['/users', '/data']));

// General Error Handler
app.use((err, req, res, next) => {
  return res.status(err.message || 500).json(err.message || 'Unexpected Error');
});

ViteExpress.listen(app, PORT, () => console.log(`Welcome to RECOMS-API ➡ ${API_URL}`));
