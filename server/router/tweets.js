import express from "express";
import { body, param } from "express-validator";
import * as tweetController from "../controller/tweet.js";
import { validate } from "../middleware/validate.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

const validateTweet = [
  body("text").trim().isLength({ min: 3 }).withMessage("tex t shoud be at leaast 3 characters"),
  validate,
];
const validateTweetParam = [param("id").isInt(), validate];

// GET /tweets
// GET /tweets?username=username
router.get("/", isAuth, tweetController.getTweets);

// GET /tweets:id
router.get("/:id", isAuth, validateTweetParam, tweetController.getTweet);

// POST /tweets
router.post("/", isAuth, validateTweet, tweetController.createTweet);

// PUT /tweets:id
router.put("/:id", isAuth, validateTweet, tweetController.updateTweet);

// Delete /tweets:id
router.delete("/:id", isAuth, validateTweetParam, tweetController.deleteTweet);

export default router;
