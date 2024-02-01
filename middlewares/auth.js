import Jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';

const { JWT_SECRET, NODE_ENV } = process.env;

const auth = (req, res, next) => {
  let payload;
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error('NeedsAutanticate');
    }
    const validToken = token.replace('Bearer ', '');
    payload = Jwt.verify(validToken, NODE_ENV ? JWT_SECRET : 'super-secret');
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(ApiError.Unauthorized('С токеном что-то не так'));
    }

    if (error.name === 'TokenExpiredError') {
      return next(ApiError.Unauthorized('Срок действия токена истек'));
    }

    if (error.message === 'NeedsAutanticate') {
      return next(ApiError.Unauthorized('Необходима авторизация'));
    }

    return new ApiError();
  }
  req.user = payload;
  return next();
};

export default auth;
