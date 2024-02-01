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

const usersRouter = new Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
usersRouter.get('/:id', userIDValidate, getUserById);
usersRouter.patch('/me', userInfoValidate, updateUserInfo);
usersRouter.patch('/me/avatar', userAvatarValidate, updateUserAvatar);

export default usersRouter;
