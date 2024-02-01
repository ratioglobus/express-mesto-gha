const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;

  const message = statusCode === 500 ? 'Ошибка на стороне сервера' : err.message;
  res.status(statusCode).send({ message });
  next();
};

export default globalErrorHandler;
