import { NextFunction, Response, Request } from "express";

export const UPDATE_SUCCESS = 201;

export const ERROR_SERVER_CODE = 500;
export const ERROR_SERVER_MESSAGE = "На сервере произошла ошибка";

export const INCORRECT_LOGIN = 401;
export const USER_NOT_FOUND = "Пользователь c указанным _id не найден";

export const DATA_INCORRECT_CODE = 400;
export const DATA_INCORRECT_MESSAGE = "Переданы некорректные данные";

export const NOT_FOUND_CODE = 404;
export const NOT_FOUND_MESSAGE = "Запрашиваемая страница не найдена";

export class MyError extends Error {
  statusCode = 0;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }

  static NotFoundError(message: string): MyError {
    return new MyError(message, 404);
  }

  static IncorrectLoginError() {
    return new MyError("Неверные логин или пароль", 401);
  }

  static ForbiddenError() {
    return new MyError("Попытка удалить чужую карточку", 403);
  }

  static IncorrectData(): MyError {
    return new MyError("Введены неверные данные", 400);
  }

  static DuplicateEmail(): MyError {
    return new MyError("Такой Email уже существует", 409);
  }
}

export const checkError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let { message } = err;
  let statusCode = 500;

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Переданы некорректные данные";
  }

  res
    .status(statusCode)
    .send({
      message:
        statusCode === 500 ? "На стороне сервера произошла ошибка" : message,
    });

  next();
};
