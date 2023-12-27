import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as userRepository from "../model/auth.js";
import config from "../config.js";

// TODO:
const jwtSecretKey = config.jwt.secretKey;
const jwtExpiresInSec = config.jwt.expiresInSec;
const bcyrptSaltRounds = config.bcrypt.saltRouds;

export async function signup(req, res) {
  const { username, password, name, email, url } = req.body;

  const user = await userRepository.findByUsername(username);

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
  setToken(res, token);
  return res.status(201).json({ username, token });
}

export async function login(req, res) {
  const { username, password } = req.body;

  const user = await userRepository.fintByUsername(username);
  if (!user) return res.status(401).json({ message: "Invalid user or password" });

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return res.status(401).json({ message: "Invalid user or password" });

  const token = createJwtToken(user.id);
  setToken(res, token);
  return res.status(200).json({ token, username });
}

export async function logout(req, res) {
  res.cookie("token", ""), res.status(200).json({ message: "User has been logged out" });
}

export async function me(req, res) {
  const user = await userRepository.findById(req.userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.status(200).json({ token: req.token, username: user.username });
}

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInSec });
}

function setToken(res, token) {
  const options = {
    maxAge: config.jwt.expiresInSec * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  res.cookie("token", token, options);
}

export async function csrfToken(req, res) {
  const csrfToken = await generateCSRFToken();
  res.status(200).json({ csrfToken });
}

async function generateCSRFToken() {
  return bcrypt.hash(config.csrf.plainToken, 1);
}
