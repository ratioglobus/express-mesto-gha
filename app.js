import express, { json } from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import router from './routes/index.js';

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

app.use(helmet());
app.use(limiter);
app.use(json());

async function startApp() {
  try {
    await mongoose
      .connect(DB_URL)
      .then(() => {
        console.log('Connected to database');
      })
      .catch((error) => {
        console.log('Error', error);
      });
    app.use(router);
    app.listen(PORT, () => {
      console.log('Server is working on port', PORT);
    });
  } catch (error) {
    console.log('Error', error);
  }
}

startApp();
