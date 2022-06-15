import { Schema, model, Types } from "mongoose";

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
  usersLiked: Types.Array<string>;
  usersDisliked: Types.Array<string>;
}
export interface ISauceModel extends ISauce, Document {}

const sauceSchema: Schema = new Schema({
  userId: { type: String },
  name: { type: String },
  manufacturer: { type: String },
  description: { type: String },
  mainPepper: { type: String },
  imageUrl: { type: String },
  heat: { type: Number },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: [{ type: String }],
  usersDisliked: [{ type: String }],
});

export default model<ISauceModel>("Sauce", sauceSchema);
