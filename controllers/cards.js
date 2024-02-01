import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import Card from '../models/card.js';
import ApiError from '../utils/ApiError.js';

export const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (error) {
    return next(ApiError());
  }
};

export const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const newCard = await new Card({ name, link, owner: req.user._id });
    return res.status(StatusCodes.CREATED).send(await newCard.save());
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(ApiError.BadRequest('Переданы неверные данные'));
    }
    return next(ApiError());
  }
};

export const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId).orFail();
    if (card.owner.toString() !== req.user._id) {
      return next(ApiError.Forbidden('Автор карточки - другой пользователь'));
    }
    return Card.deleteOne(card)
      .orFail()
      .then(() => {
        res.send({ message: 'Карточка удалена' });
      });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(ApiError.BadRequest('Переданы неверные данные'));
    }
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return next(ApiError.NotFound('Карточка не найдена'));
    }
    return next(ApiError());
  }
};

export const likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail();
    return res.send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(ApiError.BadRequest('Переданы неверные данные'));
    }
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return next(ApiError.NotFound('Карточка не найдена'));
    }
    return next(ApiError());
  }
};

export const dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail();
    return res.send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(ApiError.BadRequest('Переданы неверные данные'));
    }
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return next(ApiError.NotFound('Карточка не найдена'));
    }
    return next(ApiError());
  }
};
