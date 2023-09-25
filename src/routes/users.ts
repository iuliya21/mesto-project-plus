import { Router } from "express";
import {
  createUser,
  getUser,
  getUsers,
  login,
  updateUser,
  updateUserAvatar,
} from "../controllers/users";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:userId", getUser);
userRouter.post("/signup", createUser);
userRouter.post("/signin", login);
userRouter.patch("/me", updateUser);
userRouter.patch("/me/avatar", updateUserAvatar);

export default userRouter;
