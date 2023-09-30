import { Router } from "express";
import { createCardValidator, getCardValidator } from "../validation";
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from "../controllers/cards";

const cardRouter = Router();

cardRouter.get("/", getCards);
cardRouter.post("/", createCardValidator, createCard);
cardRouter.delete("/:cardId", getCardValidator, deleteCard);
cardRouter.put("/:cardId/likes", getCardValidator, likeCard);
cardRouter.delete("/:cardId/likes", getCardValidator, dislikeCard);

export default cardRouter;
