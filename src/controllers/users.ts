import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import {
  UPDATE_SUCCESS,
  MyError,
  DATA_INCORRECT_CODE,
  DATA_INCORRECT_MESSAGE,
  USER_NOT_FOUND,
} from "../errors";

export const jwtSecret = "secret-key123";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw MyError.IncorrectLoginError();
    }

    const matched = await bcrypt.compare(password, user.password);

    if (matched) {
      const token = jwt.sign({ _id: user._id }, jwtSecret, {
        expiresIn: "7d",
      });
      return res.send({ token });
    }

    throw MyError.IncorrectLoginError();
  } catch (error) {
    return next(error);
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hashedPassword,
    });
    return res.status(UPDATE_SUCCESS).send(newUser);
  } catch (error) {
    if (error instanceof Error && error.name === "ValidationError") {
      return res.status(DATA_INCORRECT_CODE).send({
        message: DATA_INCORRECT_MESSAGE,
      });
    }
    return next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      throw MyError.NotFoundError(USER_NOT_FOUND);
    }
    return res.send(user);
  } catch (error) {
    if (error instanceof Error && error.name === "CastError") {
      return res
        .status(DATA_INCORRECT_CODE)
        .send({ message: DATA_INCORRECT_MESSAGE });
    }
    return next(error);
  }
};

export const getUserCurrent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw MyError.NotFoundError(USER_NOT_FOUND);
    }
    return res.send(user);
  } catch (error) {
    if (error instanceof Error && error.name === "CastError") {
      return res
        .status(DATA_INCORRECT_CODE)
        .send({ message: DATA_INCORRECT_MESSAGE });
    }
    return next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        about,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      throw MyError.NotFoundError(USER_NOT_FOUND);
    }
    return res.send(user);
  } catch (error) {
    if (error instanceof Error && error.name === "ValidationError") {
      return res
        .status(DATA_INCORRECT_CODE)
        .send({ message: DATA_INCORRECT_MESSAGE });
    }
    return next(error);
  }
};

export const updateUserAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        avatar,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      throw MyError.NotFoundError(USER_NOT_FOUND);
    }
    return res.send(user);
  } catch (error) {
    if (error instanceof Error && error.name === "ValidationError") {
      return res
        .status(DATA_INCORRECT_CODE)
        .send({ message: DATA_INCORRECT_MESSAGE });
    }
    return next(error);
  }
};
