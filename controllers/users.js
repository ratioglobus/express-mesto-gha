import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import User from '../models/User.js';

const ERROR_CODE_DUPLICATE_MONGO = 11000;

const handleError = (res, error) => {
  if (error instanceof mongoose.Error.CastError) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: 'Переданы неверные данные', ...error });
  } else if (error instanceof mongoose.Error.DocumentNotFoundError
    || error instanceof mongoose.Error.ValidationError) {
    res.status(StatusCodes.NOT_FOUND).send({ message: 'Пользователь не найден' });
  } else if (error.code === ERROR_CODE_DUPLICATE_MONGO) {
    res.status(StatusCodes.CONFLICT).send({ message: 'Пользователь уже существует' });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на стороне сервера', error: error.message });
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
    res.status(StatusCodes.OK).send(user);
  } catch (error) {
    handleError(res, error);
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
