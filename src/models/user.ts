import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IUser {
  email: string;
  password: string;
}
export interface IUserModel extends IUser, Document {}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
userSchema.plugin(uniqueValidator);

export default model<IUserModel>("User", userSchema);
