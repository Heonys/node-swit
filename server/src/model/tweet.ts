import { useVirtualId } from "../db/database.js";
import Mongoose from "mongoose";
import * as UserRepository from "./auth.js";

export type TweetData = {
  text: string;
  userId: string;
  name: string;
  username: string;
  url: string;
};

const tweetSchema = new Mongoose.Schema<TweetData>(
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

export async function getAllByUsername(username: string) {
  return Tweet.find({ username }).sort({ createdAt: -1 });
}

export async function getById(id: string) {
  return Tweet.findById(id);
}

export async function create(text: string, userId: string) {
  return UserRepository.findById(userId).then((user) => {
    if (!user) return;
    return new Tweet({ text, userId, name: user.name, username: user.username }).save();
  });
}

export async function updateById(id: string, text: string) {
  return Tweet.findByIdAndUpdate(id, { text }, { returnOriginal: false });
}

export async function deleteById(id: string) {
  return Tweet.findByIdAndDelete(id);
}
