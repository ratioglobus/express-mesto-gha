import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import User from '../models/User.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на стороне севера', error: error.message });
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
        .status(StatusCodes.BAD_REQUEST).send({ message: 'Переданы неверные данные', ...error });
    }
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return res
        .status(StatusCodes.NOT_FOUND).send({ message: 'Пользователь не найден' });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на стороне сервера', error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const newUser = await new User({ name, about, avatar });

    return res.status(StatusCodes.CREATED).send(await newUser.save());
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(StatusCodes.BAD_REQUEST).send({ message: 'Переданы неверные данные', ...error });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на стороне сервера', error: error.message });
  }
};

export const updateInfoProfile = async (req, res) => {
  try {
    const { name, about } = req.body;
    const updatedInfo = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    ).orFail();
    return res.json(updatedInfo);
  } catch (error) {
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return res
        .status(StatusCodes.NOT_FOUND).send({ message: 'Пользователь не найден' });
    }
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(StatusCodes.BAD_REQUEST).send({ message: 'Переданы неверные данные', ...error });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на стороне севера', error: error.message });
  }
};

export const updateAvatarProfile = async (req, res) => {
  try {
    const { avatar } = req.body;
    const updatedInfo = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    ).orFail();
    return res.json(updatedInfo);
  } catch (error) {
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return res
        .status(StatusCodes.NOT_FOUND).send({ message: 'Пользователь не найден' });
    }
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(StatusCodes.BAD_REQUEST).send({ message: 'Переданы неверные данные', ...error });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на стороне севера', error: error.message });
  }
};
