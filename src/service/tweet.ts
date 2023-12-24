import type { HttpClient } from "@/client/http";
import type TokenStorage from "@/db/token";
import type Socket from "@/client/socket";

export interface Tweet {
  id: number;
  text: string;
  createdAt: Date | string;
  name: string;
  username: string;
  url?: string;
}

export default class TweetService {
  constructor(
    public http: HttpClient,
    public tokenStorage: TokenStorage,
    public socket: Socket
  ) {
    this.http = http;
    this.tokenStorage = tokenStorage;
    this.socket = socket;
  }

  async getTweets(username?: string): Promise<Tweet[]> {
    const query = username ? `?username=${username}` : "";
    return this.http.fetch(`/tweets${query}`, {
      headers: this.getHeaders(),
    });
  }

  async postTweet(text: string): Promise<Tweet> {
    const tweet = {
      text,
      username: "jiheon",
      name: "Jiheon",
    };

    return this.http.fetch(`/tweets`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(tweet),
    });
  }

  async deleteTweet(tweetId: number) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
  }

  async updateTweet(tweetId: number, text: string): Promise<Tweet> {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify({ text }),
    });
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }
  onSync(callback: (...args: any[]) => any) {
    return this.socket.onSync("tweets", callback);
  }
}
