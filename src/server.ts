// index.js
import express, { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import mongoose from 'mongoose';

import wildController from './controllers/wilders';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/wilderdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  autoIndex: true,
})
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err));

app.post('/api/wilders', asyncHandler(wildController.create));

app.get('/api/wilders', asyncHandler(wildController.retrieve));

app.put('/api/wilder/:_id', asyncHandler(wildController.update));

app.delete('/api/wilder/:_id', asyncHandler(wildController.delete));

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404, 'There is nothing there'));
});

app.use((error: any, req: Request, res: Response) => {
  if (error.name === 'MongoError' || error.code === 11000) {
    res.status(400);
    res.json({ success: false, message: 'Named already used in DB' });
  } else {
    res.status(error.status || 500);
    res.json({ success: false, message: error.message, stack: error.stack });
  }
});

app.listen(8000, () => console.log('Server started on port 8000'));
