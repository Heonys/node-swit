import jwt from "jsonwebtoken";
import * as userRepository from "../model/auth.js";

// TODO:
const jwtSecretKey = "qweqwe";
const AUTH_ERROR = { message: "Authentication Error" };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, jwtSecretKey, async (err, decode) => {
    if (err) return res.status(401).json(AUTH_ERROR);
    const user = await userRepository.findById(decode.id);
    if (!user) return res.status(401).json(AUTH_ERROR);

    // request에서 커스텀 속성 등록
    req.userId = user.id;
    req.token = token;
    next();
  });
};
