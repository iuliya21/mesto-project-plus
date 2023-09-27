import { Router } from "express";
import {
  getUser,
  getUserCurrent,
  getUsers,
  updateUser,
  updateUserAvatar,
} from "../controllers/users";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/me", getUserCurrent);
userRouter.get("/:userId", getUser);
userRouter.patch("/me", updateUser);
userRouter.patch("/me/avatar", updateUserAvatar);

export default userRouter;
