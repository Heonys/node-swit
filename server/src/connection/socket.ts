import jwt, { VerifyErrors } from "jsonwebtoken";
import { Server } from "socket.io";
import http from "http";
import config from "../config.js";

class Socket {
  public io: Server;
  constructor(server: http.Server) {
    this.io = new Server(server, {
      cors: config.cors.allowedOrigin,
    });

    this.io.use((socket, next) => {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error("Authentocation error"));
      }
      jwt.verify(token, config.jwt.secretKey, (error: VerifyErrors | null) => {
        if (error) {
          return next(new Error("Authentocation error"));
        }
        next();
      });
    });

    this.io.on("connection", () => {
      console.log("Socket client connected");
    });
  }
}
let socket: Socket | undefined;
export function initSocket(server: http.Server) {
  if (!socket) {
    socket = new Socket(server);
  }
}

export function getSocketIo() {
  if (!socket) {
    throw new Error("Please call init first");
  }
  return socket.io;
}
