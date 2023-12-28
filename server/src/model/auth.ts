import Mongoose from "mongoose";
import { useVirtualId } from "../db/database.js";

export type UserData = {
  name: string;
  username: string;
  password: string;
  email: string;
  url: string;
};

const userSchema = new Mongoose.Schema<UserData>({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  url: String,
});

useVirtualId(userSchema);
const User = Mongoose.model("User", userSchema);

export async function findByUsername(username: string) {
  return User.findOne({ username });
}

export async function findById(id: string) {
  return User.findById(id);
}

export async function createUser(user: UserData) {
  return new User(user).save().then((data) => data.id);
}
