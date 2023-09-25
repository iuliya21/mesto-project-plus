import { Schema, model } from "mongoose";
import isURL from "validator/lib/isURL";
import isEmail from "validator/lib/isEmail";

type TUser = {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
};

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Жак-Ив Кусто",
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 200,
      default: "Исследователь",
    },
    avatar: {
      type: String,
      validate: [(data: string) => isURL(data)],
      default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [(data: string) => isEmail(data)],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export default model<TUser>("user", userSchema);
