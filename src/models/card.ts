import { Schema, Types, model } from "mongoose";
import isURL from "validator/lib/isURL";

type TCard = {
  name: string;
  link: string;
  owner: Types.ObjectId;
  likes: Types.ObjectId[];
  createdAt: Date;
};

const cardSchema = new Schema<TCard>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: [(data: string) => isURL(data)],
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    likes: {
      type: [Schema.Types.ObjectId],
      default: [],
      ref: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

export default model<TCard>("card", cardSchema);
