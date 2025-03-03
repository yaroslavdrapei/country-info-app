import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import { countriesRouter } from './routes/countries';
import { usersRouter } from './routes/users';

const PORT = process.env.PORT!;
const MONGODB_URL = process.env.MONGODB_URL!;

const app = express();
mongoose.connect(MONGODB_URL);

app.use(express.json());
app.use('/countries', countriesRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log('App is running');
});
