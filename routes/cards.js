import { Router } from 'express';
import {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} from '../controllers/cards.js';

const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.post('/', createCard);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', dislikeCard);
cardRouter.delete('/:cardId', deleteCard);

export default cardRouter;
