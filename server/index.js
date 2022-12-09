import express from 'express';
import cors from 'cors';

import mongoose from 'mongoose';

import {registerValidation, loginValidation, serverCreateValidation} from './validations.js';

import { handleValidationErrors, checkAuth } from './utils/index.js';

import { UserController, ServerController } from './controllers/index.js';

mongoose
  .connect("mongodb://localhost:27017/pm2manager")
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());
app.use(cors());

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/server/list', checkAuth, serverCreateValidation, ServerController.getAll);
app.post('/server/add', checkAuth, serverCreateValidation, ServerController.create);
app.get('/server/:id', checkAuth, serverCreateValidation, ServerController.getOne);
app.delete('/server/:id', checkAuth, serverCreateValidation, ServerController.remove);
app.patch('/server/:id', checkAuth, serverCreateValidation, ServerController.update);


app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});
