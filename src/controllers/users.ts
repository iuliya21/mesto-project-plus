import { Request, Response } from "express";
import User from "../models/user";
import {
  errorServer,
  UPDATE_SUCCESS,
  errorRequest,
  dataUncorrect,
} from "../errors";

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
    const newUser = await User.create(req.body);
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
      return res.status(dataUncorrect.code).send(dataUncorrect.message);
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
