import { StatusCodes } from 'http-status-codes';

// eslint-disable-next-line no-unused-vars
export default (error, req, res, next) => {
  const { statusCode = StatusCodes.INTERNAL_SERVER_ERROR, message } = error;

  res.status(statusCode).send({
    message: statusCode === StatusCodes.INTERNAL_SERVER_ERROR ? 'На сервере произошла ошибка' : message,
  });
};
