import { Schema, model } from "mongoose";
import isURL from "validator/lib/isURL";

type TUser = {
  name: string;
  about: string;
  avatar: string;
};

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 200,
    },
    avatar: {
      type: String,
      required: true,
      validate: [(data: string) => isURL(data), "Невалидный аватар"],
    },
  },
  {
    versionKey: false,
  },
);

export default model<TUser>("user", userSchema);
