import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { jwtSecret } from "../controllers/users";
import { errorServer } from "../errors";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization as string;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, jwtSecret) as JwtPayload;
  } catch (error) {
    return res.status(errorServer.code).send({ message: errorServer.message });
  }
  req.user = { _id: payload._id };
  return next();
};

export default auth;
