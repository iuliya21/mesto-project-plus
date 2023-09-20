import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import router from "./routes";

declare global {
  namespace Express {
    interface Request {
      user: {_id: string};
    }
  }
}

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: "650b587207d6a133db66e72f",
  };
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});