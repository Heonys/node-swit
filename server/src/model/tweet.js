import { useVirtualId } from "../db/database.js";
import Mongoose from "mongoose";
import * as UserRepository from "./auth.js";

const tweetSchema = new Mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    url: String,
  },
  { timestamps: true }
);
useVirtualId(tweetSchema);

const Tweet = Mongoose.model("Tweet", tweetSchema);

export async function getAll() {
  return Tweet.find().sort({ createdAt: -1 });
}

export async function getAllByUsername(username) {
  return Tweet.find({ username }).sort({ createdAt: -1 });
}

export async function getById(id) {
  return Tweet.findById(id);
}

export async function create(text, userId) {
  return UserRepository.findById(userId).then((user) => {
    return new Tweet({ text, userId, name: user.name, username: user.username }).save();
  });
}

export async function updateById(id, text) {
  return Tweet.findByIdAndUpdate(id, { text }, { returnOriginal: false });
}

export async function deleteById(id) {
  return Tweet.findByIdAndDelete(id);
}