import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  email: string;
  password: string;
}
interface IUserModel extends IUser, Document {}

// 2. Create a Schema corresponding to the document interface.
const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
userSchema.plugin(uniqueValidator);

// 3. Create a Model.
export const User = model<IUserModel>("User", userSchema);
