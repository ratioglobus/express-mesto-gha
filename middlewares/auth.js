import { StatusCodes } from 'http-status-codes';
import Jwt from 'jsonwebtoken';

const { JWT_SECRET, NODE_ENV } = process.env;

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  let payload;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  }
  const token = authorization.replace('Bearer ', '');

  try {
    payload = Jwt.verify(token, NODE_ENV ? JWT_SECRET : 'very-secret-key');
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: 'Необходима авторизация', error: error.message });
  }

  req.user = payload;
  return next();
};

export default { auth };
