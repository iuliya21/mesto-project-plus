import { NextFunction, Request, Response } from "express";
import {
  UPDATE_SUCCESS,
  MyError,
} from "../errors";
import Card from "../models/card";

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    next(error);
  }
};

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, link } = req.body;
    const newCard = await Card.create({
      name,
      link,
      owner: req.user._id,
    });
    return res.status(UPDATE_SUCCESS).send(newCard);
  } catch (error) {
    if (error instanceof Error && error.name === "ValidationError") {
      return next(MyError.IncorrectData());
    }
    return next(error);
  }
};

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findOneAndDelete({
      _id: req.params.cardId,
      owner: { _id: req.user._id },
    });

    if (!card) {
      throw MyError.ForbiddenError();
    }
    return res.send(card);
  } catch (error) {
    if (error instanceof Error && error.name === "CastError") {
      return next(MyError.IncorrectData());
    }
    return next(error);
  }
};

export const likeCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      throw MyError.NotFoundError("Запрашиваемая карточка не найдена");
    }

    return res.send(card);
  } catch (error) {
    if (error instanceof Error && error.name === "CastError") {
      return next(MyError.IncorrectData());
    }
    return next(error);
  }
};

export const dislikeCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      throw MyError.NotFoundError("Запрашиваемая карточка не найдена");
    }

    return res.send(card);
  } catch (error) {
    if (error instanceof Error && error.name === "CastError") {
      return next(MyError.IncorrectData());
    }
    return next(error);
  }
};
