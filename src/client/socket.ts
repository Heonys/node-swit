import socket from "socket.io-client";

export default class Socket {
  io: any;
  constructor(
    public baseUrl: string,
    public getAccessToken: any
  ) {
    this.io = socket(baseUrl, {
      auth: (cb) => cb({ token: getAccessToken() }),
    });

    this.io.on("connect_error", (error: Error) => {
      console.log("socket error", error.message);
    });
  }
  onSync(event: string, callback: any) {
    if (!this.io.connected) {
      this.io.connect();
    }

    this.io.on(event, (message: string) => callback(message));
    return () => this.io.off(event);
  }
}
