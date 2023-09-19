import express, { Router } from "express";
import mongoose from "mongoose";

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb");

const router = Router();

router.get("/users", (req, res) => {
  res.status(200).send({ name: "Вася2" });
});

router.post("/users/:userId", (req, res) => {
  const { userId } = req.params;
  const newUser = {
    ...req.body,
    userId,
  }
});

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
