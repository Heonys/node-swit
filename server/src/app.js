import express from "express";
import cors from "cors";
import halmet from "helmet";
import morgan from "morgan";
import cookiePaer from "cookie-parser";
import tweetRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import config from "./config.js";
import { initSocket } from "./connection/socket.js";
import { connectDB } from "./db/database.js";
import { csrfCheck } from "./middleware/csrf.js";
import rateLimit from "./middleware/rate-limiter.js";

const corsOption = {
  origin: config.cors.allowedOrigin,
  optionsSuccessStatus: 200,
  credentials: true,
};

const app = express();

app.use(express.json());
app.use(cookiePaer());
app.use(halmet());
app.use(cors(corsOption));
app.use(morgan("tiny"));
app.use(rateLimit);

app.use(csrfCheck);
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
