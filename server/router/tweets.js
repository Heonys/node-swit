import express from "express";

let tweets = [
  {
    id: "1",
    text: "김지헌 화이팅",
    createdAt: Date.now().toString(),
    name: "Bob",
    username: "bob",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  {
    id: "2",
    text: "김지헌 화이팅22",
    createdAt: Date.now().toString(),
    name: "jiheon",
    username: "jiheon",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
];

const router = express.Router();

// GET /tweets
// GET /tweets?username=username
router.get("/", (req, res) => {
  const username = req.query.username;
  const data = username ? tweets.filter((t) => t.username === username) : tweets;
  res.status(200).json(data);
});

// GET /tweets:id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const tweet = tweets.find((t) => t.id === id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `tweet ${id} not find` });
  }
});
// POST /tweets
router.post("/", (req, res) => {
  const { text, name, username } = req.body;
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date().toLocaleString(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  res.status(201).json(tweets);
});
// PUT /tweets:id
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { text } = req.body;
  const tweet = tweets.find((t) => t.id === id);
  if (tweet) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `tweet ${id} not find` });
  }
});
// Delete /tweets:id
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  tweets = tweets.filter((t) => t.id !== id);
  res.sendStatus(204);
});

export default router;
