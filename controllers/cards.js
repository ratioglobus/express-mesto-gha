import { StatusCodes } from 'http-status-codes';
import Card from '../models/Card.js';

export const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка', error: error.message });
  }
};

export const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const newCard = new Card({ name, link, owner: req.user._id });
    res.status(StatusCodes.CREATED).send(await newCard.save());
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: 'Переданы неверные данные', ...error });
  }
};

export const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail(new Error('CardNotFound'));
    res.send(card);
  } catch (error) {
    if (error.message === 'CardNotFound') {
      res.status(StatusCodes.NOT_FOUND).send({ message: 'Карточка не найдена' });
    } else if (error.name === 'CastError') {
      res.status(StatusCodes.BAD_REQUEST).send({ message: 'Переданы неверные данные' });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка', error: error.message });
    }
  }
};

export const dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail(new Error('CardNotFound'));
    res.send(card);
  } catch (error) {
    if (error.message === 'CardNotFound') {
      res.status(StatusCodes.NOT_FOUND).send({ message: 'Карточка не найдена' });
    } else if (error.name === 'CastError') {
      res.status(StatusCodes.BAD_REQUEST).send({ message: 'Переданы неверные данные' });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка', error: error.message });
    }
  }
};

export const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId).orFail(new Error('CardNotFound'));
    res.send(card);
  } catch (error) {
    if (error.message === 'CardNotFound') {
      res.status(StatusCodes.NOT_FOUND).send({ message: 'Карточка не найдена' });
    } else if (error.name === 'CastError') {
      res.status(StatusCodes.BAD_REQUEST).send({ message: 'Переданы неверные данные' });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка', error: error.message });
    }
  }
};
