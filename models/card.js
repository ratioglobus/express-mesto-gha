import mongoose from 'mongoose';
import { URLExpression } from '../utils/const.js';

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле с именем карточки является обязательным'],
      minlength: [2, 'Минимальная длина строки 2 символа'],
      maxlength: [30, 'Минимальная длина строки 30 символов'],
    },
    link: {
      type: String,
      match: [URLExpression, 'Вы ввели не корректный URL'],
      required: [true, 'Поле с ссылкой на картинку является обязательным'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

export default mongoose.model('card', cardSchema);
