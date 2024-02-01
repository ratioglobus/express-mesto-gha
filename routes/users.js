import { Router } from 'express';
import {
  getCurrentUser,
  getUserById,
  getUsers,
  updateAvatarProfile,
  updateInfoProfile,
} from '../controllers/users.js';
import userAvatarValidate from '../middlewares/userAvatarValidate.js';
import userIDValidate from '../middlewares/userIDValidate.js';
import userInfoValidate from '../middlewares/userInfoValidate.js';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:userId', userIDValidate, getUserById);
userRouter.patch('/me', userInfoValidate, updateInfoProfile);
userRouter.patch('/me/avatar', userAvatarValidate, updateAvatarProfile);

export default userRouter;
