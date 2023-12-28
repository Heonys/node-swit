import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as userRepository from "../model/auth.js";
import config from "../config.js";

const jwtSecretKey = config.jwt.secretKey;
const AUTH_ERROR = { message: "Authentication Error" };

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;
  const authHeader = req.get("Authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }
  if (token) {
    token = req.cookies["token"];
  }

  if (!token) {
    return res.status(401).json(AUTH_ERROR);
  }

  jwt.verify(token, jwtSecretKey, async (err: any, decode: any) => {
    if (err) return res.status(401).json(AUTH_ERROR);
    const user = await userRepository.findById(decode.id);
    if (!user) return res.status(401).json(AUTH_ERROR);

    // request에서 커스텀 속성 등록
    req.userId = user.id;
    req.token = token!;
    next();
  });
};
