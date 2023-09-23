import { Request, Response } from "express";
import {
  errorServer,
  REQUEST_SUCCESS,
  UPDATE_SUCCESS,
  errorRequest,
  dataUncorrect,
} from "../errors";
import Card from "../models/card";

export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find({});
    res.status(REQUEST_SUCCESS).send(cards);
  } catch (error) {
    res.status(errorServer.code).send({ message: errorServer.message });
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
    return res.status(UPDATE_SUCCESS).send(newCard);
  } catch (error) {
    if (error instanceof Error && error.name === "ValidationError") {
      return res.status(dataUncorrect.code).send({
        message: dataUncorrect.message,
      });
    }
    return res.status(errorServer.code).send({ message: errorServer.message });
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndRemove(cardId);

    if (!card) {
      return res
        .status(errorRequest.code)
        .send({ message: errorRequest.message });
    }
    return res.status(REQUEST_SUCCESS).send(card);
  } catch (error) {
    return res.status(errorServer.code).send({ message: errorServer.message });
  }
};

export const likeCard = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true },
    );

    if (!card) {
      return res
        .status(errorRequest.code)
        .send({ message: errorRequest.message });
    }

    return res.status(REQUEST_SUCCESS).send(card);
  } catch (error) {
    if (error instanceof Error && error.name === "ValidationError") {
      return res.status(dataUncorrect.code).send({
        message: dataUncorrect.message,
      });
    }
    return res.status(errorServer.code).send({ message: errorServer.message });
  }
};

export const dislikeCard = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true },
    );

    if (!card) {
      return res
        .status(errorRequest.code)
        .send({ message: errorRequest.message });
    }

    return res.status(REQUEST_SUCCESS).send(card);
  } catch (error) {
    if (error instanceof Error && error.name === "ValidationError") {
      return res.status(dataUncorrect.code).send({
        message: dataUncorrect.message,
      });
    }
    return res.status(errorServer.code).send({ message: errorServer.message });
  }
};
