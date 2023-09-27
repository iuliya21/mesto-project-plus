import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import router from "./routes";
import { createUser, login } from "./controllers/users";
import auth from "./middlewares/auth";

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(express.json());

app.post("/signup", createUser);
app.post("/signin", login);

app.use(auth);

app.use(router);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
