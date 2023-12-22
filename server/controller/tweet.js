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
  const { text, name, username } = req.body;
  const tweets = await tweetRepository.create(text, username, name);
  res.status(201).json(tweets);
}

export async function updateTweet(req, res) {
  const id = req.params.id;
  const { text } = req.body;
  const tweet = await tweetRepository.updateById(id, text);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `tweet ${id} not find` });
  }
}

export async function deleteTweet(req, res) {
  const id = req.params.id;
  await tweetRepository.deleteById(id);
  res.sendStatus(204);
}
