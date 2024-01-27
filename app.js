import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './routes/index.js';

const { PORT = 3000 } = process.env;
const BASE_URL_DB = 'mongodb://localhost:27017/mestodb';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '65b5611b8148418571e56a8f',
  };
  next();
});

async function startApp() {
  try {
    await mongoose.connect(BASE_URL_DB);
    console.log('Connected to database');

    app.use(router);
    app.listen(PORT, () => {
      console.log('Server is working on port', PORT);
    });
  } catch (error) {
    console.log('Error', error);
  }
}

startApp();
