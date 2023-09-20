import { Request, Response } from "express";
import Card from "../models/card";

export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (error) {
    res.status(500).send({ message: "Ошибка на стороне сервера" });
  }
};

export const createCard = async (req: Request, res: Response) => {
  try {
    const { name, link } = req.body;
    const newCard = await Card.create({
      name,
      link,
      owner: req.user._id,
    });
    res.status(201).send(newCard);
  } catch (error) {
    res.status(500).send({ message: "Ошибка на стороне сервера" });
  }
};
