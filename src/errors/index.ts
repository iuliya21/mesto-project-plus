import { NextFunction, Response, Request } from "express";

export const UPDATE_SUCCESS = 201;

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
