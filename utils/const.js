const ERROR_CODE_DUPLICATE_MONGO = 11000;
const SALT_ROUNDS = 10;
const URLExpression = /https?:\/\/(www\.)?[-a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/i;
const emailExpression = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

export {
  ERROR_CODE_DUPLICATE_MONGO, SALT_ROUNDS, URLExpression, emailExpression,
};
