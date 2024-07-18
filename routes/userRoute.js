import express from 'express';
import { registerUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/api/v1/users/register', registerUser);

export default userRouter;