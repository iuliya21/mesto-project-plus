import { Router } from "express";
import { getCards, createCard } from "../controllers/cards";

const cardRouter = Router();

cardRouter.get("/", getCards);
cardRouter.post("/", createCard);

export default cardRouter;
