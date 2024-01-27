import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import userRouter from './users.js';
import cardRouter from './cards.js';

const router = Router();

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use('*', (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send({ message: 'This page is not exist!' });
});

export default router;
