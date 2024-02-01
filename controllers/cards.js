import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import Card from '../models/card.js';
import asyncErrorHandler from '../utils/asyncErrorHandler.js';
import CustomError from '../utils/customError.js';

// Get all cards controller
// eslint-disable-next-line no-unused-vars
const getCards = asyncErrorHandler((req, res, next) => Card.find({})
  .populate(['owner', 'likes'])
  .then((cards) => {
    res.send(cards);
  }));

// Create card controller
const createCard = asyncErrorHandler((req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  return Card({ name, link, owner: _id })
    .save()
    .then((card) => res.status(StatusCodes.CREATED).send(card))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return next(
          new CustomError('Переданы некорректные данные при создании карточки', StatusCodes.BAD_REQUEST),
        );
      }

      return Promise.reject(error);
    });
});

// Delete card controller
const deleteCard = asyncErrorHandler((req, res, next) => {
  const { cardId } = req.params;

  return Card.findById(cardId)
    .orFail()
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        throw new CustomError('Нельзя удалять карточки других пользователей', StatusCodes.FORBIDDEN);
      }
      return card.deleteOne(card).orFail().then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new CustomError('Карточка с указанным ID не найдена', StatusCodes.NOT_FOUND));
      }

      return Promise.reject(error);
    });
});

// Toggle like card controller
const toggleCardLike = (action, req, res, next) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  return Card.findByIdAndUpdate(cardId, { [action]: { likes: _id } }, { new: true })
    .populate('likes')
    .orFail()
    .then((updatedCard) => res.send(updatedCard))
    .catch((error) => {
      if (error instanceof mongoose.Error.DocumentNotFoundError) {
        return next(
          new CustomError(`Передан несуществующий ID ${req.params.cardId} карточки`, StatusCodes.NOT_FOUND),
        );
      }

      if (error instanceof mongoose.Error.CastError) {
        return next(
          new CustomError('Переданы некорректные данные для постановки/снятии лайка', StatusCodes.BAD_REQUEST),
        );
      }

      return Promise.reject(error);
    });
};

// Add like card decorator
const likeCard = asyncErrorHandler((req, res, next) => toggleCardLike('$addToSet', req, res, next));

// Delete like card decorator
const dislikeCard = asyncErrorHandler((req, res, next) => toggleCardLike('$pull', req, res, next));

export {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
