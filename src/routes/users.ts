import { Router } from "express";
import {
  getUser,
  getUserCurrent,
  getUsers,
  updateUser,
  updateUserAvatar,
} from "../controllers/users";
import {
  getUserByIdValidator,
  updateUserAvatarValidator,
  updateUserInfoValidator,
} from "../validation";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/me", getUserCurrent);
userRouter.get("/:userId", getUserByIdValidator, getUser);
userRouter.patch("/me", updateUserInfoValidator, updateUser);
userRouter.patch("/me/avatar", updateUserAvatarValidator, updateUserAvatar);

export default userRouter;
