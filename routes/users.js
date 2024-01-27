import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateInfoProfile,
  updateAvatarProfile,
} from '../controllers/users.js';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserById);
userRouter.post('', createUser);
userRouter.patch('/me', updateInfoProfile);
userRouter.patch('/me/avatar', updateAvatarProfile);

export default userRouter;
