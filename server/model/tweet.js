import * as userRepository from "../model/auth.js";

let tweets = [
  // {
  //   id: "1",
  //   text: "화이팅11",
  //   createdAt: new Date().toString(),
  //   userId: "1",
  // },
  // {
  //   id: "2",
  //   text: "화이팅22",
  //   createdAt: new Date().toString(),
  //   userId: "1",
  // },
];

export async function getAll() {
  return Promise.all(
    tweets.map(async (tweet) => {
      const { name, username, url } = await userRepository.findById(tweet.userId);
      return { ...tweet, name, username, url };
    })
  );
}

export async function getAllByUsername(username) {
  return getAll().then((tweets) => {
    return tweets.filter((t) => t.username === username);
  });
}

export async function getById(id) {
  const target = tweets.find((t) => t.id === id);
  if (!target) return;
  const { name, username, url } = await userRepository.findById(target.userId);
  return { ...target, name, username, url };
}

export async function create(text, userId) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date().toLocaleString(),
    userId,
  };
  tweets = [tweet, ...tweets];
  return getById(tweet.id);
}
export async function updateById(id, text) {
  const tweet = tweets.find((t) => t.id === id);
  if (tweet) tweet.text = text;
  return getById(tweet.id);
}

export async function deleteById(id) {
  tweets = tweets.filter((t) => t.id !== id);
}
