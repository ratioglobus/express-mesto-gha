import mongoose from 'mongoose';
import validator from 'validator';
import regexURL from '../utils/const.js';

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    match: [regexURL, 'URL некорректен'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validator: {
      validator: (v) => validator.isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
});

export default mongoose.model('user', userScheme);
