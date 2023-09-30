import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import { celebrate, Joi, errors } from "celebrate";
import router, { limiter } from "./routes";
import { createUser, login } from "./controllers/users";
import auth from "./middlewares/auth";
import { checkError } from "./errors";
import { requestLogger, errorLogger } from "./middlewares/logger";
import { urlRegExp } from "./validation";

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(express.json());

app.use(limiter);

app.use(requestLogger);

app.post("/signup", celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(urlRegExp),
  }),
}), createUser);

app.post("/signin", celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(checkError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
