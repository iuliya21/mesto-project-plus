import {
  Router, Request, Response, NextFunction,
} from "express";
import rateLimit from "express-rate-limit";
import { MyError } from "../errors";
import userRouter from "./users";
import cardRouter from "./cards";

export const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 1000,
  message:
    "Слишком большое количество запросов с вашего ip-адреса. Повторите запрос позднее",
});

const router = Router();

router.use("/users", userRouter);
router.use("/cards", cardRouter);

router.use((req: Request, res: Response, next: NextFunction) => {
  const error = MyError.NotFoundError(
    "Запрашиваемая страница не найдена",
  );
  next(error);
});

export default router;
