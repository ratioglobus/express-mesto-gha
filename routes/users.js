import { Router } from 'express';
import {
  getUsers,
  getCurrentUser,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
} from '../controllers/users.js';
import userIDValidate from '../middlewares/userIDValidate.js';
import userInfoValidate from '../middlewares/userInfoValidate.js';
import userAvatarValidate from '../middlewares/userAvatarValidate.js';

const userRouter = new Router();

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:id', userIDValidate, getUserById);
userRouter.patch('/me', userInfoValidate, updateUserInfo);
userRouter.patch('/me/avatar', userAvatarValidate, updateUserAvatar);

export default userRouter;
