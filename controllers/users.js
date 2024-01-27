import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import User from '../models/User.js';

const handleError = (res, error) => {
  if (error.name === 'CastError') {
    res.status(StatusCodes.BAD_REQUEST).send({ message: 'Переданы неверные данные для поиска пользователя.' });
  } else if (error.name === 'DocumentNotFoundError') {
    res.status(StatusCodes.NOT_FOUND).send({ message: 'Пользователь с указанным id не найден.' });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере.' });
  }
};

const updateUser = async (userId, update) => User.findByIdAndUpdate(userId, update, {
  new: true,
  runValidators: true,
}).orFail();

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    handleError(res, error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).orFail();
    return res.status(StatusCodes.OK).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: 'Переданы неверные данные', ...error });
    }
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: 'Пользователь не найден' });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка на стороне сервера', error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const newUser = await User.create({ name, about, avatar });
    res.status(StatusCodes.CREATED).send(newUser);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateInfoProfile = async (req, res) => {
  try {
    const { name, about } = req.body;
    const updatedInfo = await updateUser(req.user._id, { name, about });
    res.json(updatedInfo);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateAvatarProfile = async (req, res) => {
  try {
    const { avatar } = req.body;
    const updatedInfo = await updateUser(req.user._id, { avatar });
    res.json(updatedInfo);
  } catch (error) {
    handleError(res, error);
  }
};
