import { getSocketIo } from "../connection/socket.js";
import * as tweetRepository from "../model/tweet.js";

export async function getTweets(req, res) {
  const username = req.query.username;
  const data = await (username ? tweetRepository.getAllByUsername(username) : tweetRepository.getAll());
  res.status(200).json(data);
}

export async function getTweet(req, res) {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `tweet ${id} not find` });
  }
}

export async function createTweet(req, res) {
  const { text } = req.body;
  const tweet = await tweetRepository.create(text, req.userId);
  res.status(201).json(tweet);
  getSocketIo().emit("tweets", tweet);
}

export async function updateTweet(req, res) {
  const id = req.params.id;
  const { text } = req.body;

  const tweet = await tweetRepository.getById(id);
  if (!tweet) {
    return res.sendStatus(404);
  }
  if (tweet.userId !== req.userId) {
    res.sendStatus(403);
  }

  const updatedTweet = await tweetRepository.updateById(id, text);
  res.status(200).json(updatedTweet);
}

export async function deleteTweet(req, res) {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);
  if (!tweet) {
    return res.sendStatus(404);
  }
  if (tweet.userId !== req.userId) {
    res.sendStatus(403);
  }

  await tweetRepository.deleteById(id);
  res.sendStatus(204);
}
