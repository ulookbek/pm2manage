import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];

export const serverCreateValidation = [
  body('name', 'Введите название сервера').isLength({ min: 3 }).isString(),
  body('ip', 'Неверный формат IP').isLength({ min: 3 }).isString(),
  body('port', 'Неверный формат порта').optional().isString(),
];
