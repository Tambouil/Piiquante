import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  email: string;
  password: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
userSchema.plugin(uniqueValidator);

// 3. Create a Model.
export const User = model<IUser>("User", userSchema);
