import { Router } from 'express';
import { errors } from 'celebrate';
import userRouter from './users.js';
import cardRouter from './cards.js';
import { createUser, login } from '../controllers/users.js';
import auth from '../middlewares/auth.js';
import userAuthValidate from '../middlewares/userAuthValidate.js';
import globalErrorHandler from '../utils/globalErrorHandler.js';
import ApiError from '../utils/ApiError.js';

const router = Router();

router.post('/signin', userAuthValidate, login);
router.post('/signup', userAuthValidate, createUser);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('*', auth, (req, res, next) => {
  next(ApiError.NotFound('Страница не найдена'));
});

router.use(errors());
router.use(globalErrorHandler);

export default router;
