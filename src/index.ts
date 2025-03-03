import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { countriesRouter } from './routes/countries';

const PORT = process.env.PORT!;
const app = express();

app.use('/countries', countriesRouter);

app.listen(PORT, () => {
  console.log('App is running');
});
