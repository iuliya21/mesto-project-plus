import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: "Ошибка на стороне сервера" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    return res.status(201).send(newUser);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .send({ message: "Некорректные данные", error: error.message });
    }
    return res
      .status(500)
      .send({ message: "Ошибка на стороне сервера", error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "Пользователь не найден" });
    }

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: "Ошибка на стороне сервера" });
  }
};
