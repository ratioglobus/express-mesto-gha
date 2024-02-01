import { Joi, celebrate } from 'celebrate';
import { URLExpression } from '../utils/const.js';

export default celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp(URLExpression)),
  }),
});
