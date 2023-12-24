import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import config from "../config.js";

class Socket {
  constructor(server) {
    this.io = new Server(server, {
      cors: "*",
    });

    this.io.use((socket, next) => {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error("Authentocation error"));
      }
      jwt.verify(token, config.jwt.secretKey, (error) => {
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
let socket;
export function initSocket(server) {
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
