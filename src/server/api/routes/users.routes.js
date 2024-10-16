import express from 'express';

import upload from '../../middlewares/cloudinary-files-upload.cjs';

import { deleteUser, getUsers, loginUser, registerUser, updateUserRole } from '../controllers/users.controller.js';
import { excludeRoutes } from '../../utils/routes-excluder.js';
import { isAdmin, isLoggedIn } from '../../middlewares/authorizations-middlewares.js';

const userRouter = express.Router();

// General Middlewares
userRouter.use(excludeRoutes(isLoggedIn, ['/login', '/register']));

// Users Routes
userRouter.get('/', getUsers);
userRouter.delete('/delete/:user', isAdmin, deleteUser);
userRouter.put('/update', isAdmin, updateUserRole);
userRouter.post('/register', upload.single('img'), registerUser);
userRouter.post('/login', loginUser);

export default userRouter;
