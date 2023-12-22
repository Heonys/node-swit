import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as userRepository from "../model/auth.js";

// TODO:
const jwtSecretKey = "qweqwe";
const jwtExpiresInDays = "2d";
const bcyrptSaltRounds = 12;

export async function signup(req, res) {
  const { username, password, name, email, url } = req.body;

  const user = await userRepository.fintByUsername(username);

  if (user) {
    res.status(409).json({ message: `${username} already exists` });
  }
  const hashed = await bcrypt.hash(password, bcyrptSaltRounds);
  const userId = await userRepository.createUser({
    name,
    username,
    password: hashed,
    email,
    url,
  });

  const token = createJwtToken(userId);
  res.status(201).json({ username, token });
}

export async function login(req, res) {
  const { username, password } = req.body;

  const user = await userRepository.fintByUsername(username);
  if (!user) return res.status(401).json({ message: "Invalid user or password" });

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return res.status(401).json({ message: "Invalid user or password" });

  const token = createJwtToken(user.id);
  return res.status(200).json({ token, username });
}

export async function me(req, res) {
  const user = await userRepository.findById(req.userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.status(200).json({ token: req.token, username: user.username });
}

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}
