import { Schema, model } from "mongoose";

export interface ISauce {
  userId: string;
  name: string;
  manufacturer: string;
  description: string;
  mainPepper: string;
  imageUrl: string;
  heat: number;
  likes: number;
  dislikes: number;
  usersLiked: Array<string>;
  usersDisliked: Array<string>;
}
export interface ISauceModel extends ISauce, Document {}

const sauceSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  manufacturer: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  mainPepper: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  heat: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  dislikes: {
    type: Number,
    required: true,
    default: 0,
  },
  usersLiked: {
    type: [String],
    required: true,
    default: [],
  },
  usersDisliked: {
    type: [String],
    required: true,
    default: [],
  },
});

export default model<ISauceModel>("Sauce", sauceSchema);
