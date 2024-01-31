import { Router } from 'express';
import {
  getUsers,
  getUserById,
  updateInfoProfile,
  updateAvatarProfile,
  getCurrentUser,
} from '../controllers/users.js';
import userValidate from '../middlewares/userValidate.js';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/me', userValidate, getCurrentUser);
userRouter.get('/:userId', getUserById);
userRouter.patch('/me', updateInfoProfile);
userRouter.patch('/me/avatar', updateAvatarProfile);

export default userRouter;
