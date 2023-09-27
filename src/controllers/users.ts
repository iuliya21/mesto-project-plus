import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import {
  errorServer,
  UPDATE_SUCCESS,
  errorRequest,
  dataUncorrect,
  uncorrectLogin,
} from "../errors";

export const jwtSecret = "secret-key123";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(errorRequest.code)
        .send({ message: errorRequest.message });
    }

    const matched = await bcrypt.compare(password, user.password);

    if (matched) {
      const token = jwt.sign({ _id: user._id }, jwtSecret, {
        expiresIn: "7d",
      });
      return res
        .send({ token });
    }

    return res
      .status(uncorrectLogin.code)
      .send({ message: uncorrectLogin.message });
  } catch (error) {
    return res.status(errorServer.code).send({ message: errorServer.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(errorServer.code).send({ message: errorServer.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
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
      return res.status(dataUncorrect.code).send({
        message: dataUncorrect.message,
      });
    }
    return res.status(errorServer.code).send({ message: errorServer.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(errorRequest.code)
        .send({ message: errorRequest.message });
    }

    return res.send(user);
  } catch (error) {
    if (error instanceof Error && error.name === "CastError") {
      return res.status(dataUncorrect.code).send({ message: dataUncorrect.message });
    }
    return res.status(errorServer.code).send({ message: errorServer.message });
  }
};

export const getUserCurrent = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(errorRequest.code)
        .send({ message: errorRequest.message });
    }
    return res.send(user);
  } catch (error) {
    if (error instanceof Error && error.name === "CastError") {
      return res.status(dataUncorrect.code).send({ message: dataUncorrect.message });
    }
    return res.status(errorServer.code).send({ message: errorServer.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
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
      return res
        .status(errorRequest.code)
        .send({ message: errorRequest.message });
    }
    return res.send(user);
  } catch (error) {
    if (error instanceof Error && error.name === "ValidationError") {
      return res.status(dataUncorrect.code).send({
        message: dataUncorrect.message,
      });
    }
    return res.status(errorServer.code).send({ message: errorServer.message });
  }
};

export const updateUserAvatar = async (req: Request, res: Response) => {
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
      return res
        .status(errorRequest.code)
        .send({ message: errorRequest.message });
    }
    return res.send(user);
  } catch (error) {
    if (error instanceof Error && error.name === "ValidationError") {
      return res.status(dataUncorrect.code).send({
        message: dataUncorrect.message,
      });
    }
    return res.status(errorServer.code).send({ message: errorServer.message });
  }
};
