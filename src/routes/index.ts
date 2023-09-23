import { Router, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { errorRequest } from "../errors";
import userRouter from "./users";
import cardRouter from "./cards";

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 1000,
  message:
    "Слишком большое количество запросов с вашего ip-адреса. Повторите запрос позднее",
});

const router = Router();

router.use("/users", userRouter, limiter);
router.use("/cards", cardRouter, limiter);

router.use((req: Request, res: Response) => {
  res.status(errorRequest.code).send(errorRequest.message);
});

export default router;
