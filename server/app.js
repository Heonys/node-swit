import express from "express";
import cors from "cors";
import halmet from "helmet";
import morgan from "morgan";
import tweetRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import config from "./config.js";
import { initSocket } from "./connection/socket.js";
import { connectDB } from "./db/database.js";

const app = express();

app.use(express.json());
app.use(halmet());
app.use(cors());
app.use(morgan("tiny"));

app.use("/tweets", tweetRouter);
app.use("/auth", authRouter);

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res) => {
  console.error(err);
  res.sendStatus(500);
});

connectDB()
  .then(() => {
    const server = app.listen(config.host.port);
    initSocket(server);
  })
  .catch(console.err);
