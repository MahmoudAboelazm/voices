import { model, Schema } from "mongoose";

export interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio: string;
  imageId: string;
  imageURL: string;
}

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  bio: String,
  imageId: String,
  imageURL: String,
});
export const User = model<UserModel>("User", UserSchema);
