import type { HttpClient } from "@/client/http";
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
    public socket: Socket
  ) {
    this.http = http;
    this.socket = socket;
  }

  async getTweets(username?: string): Promise<Tweet[]> {
    const query = username ? `?username=${username}` : "";
    return this.http.fetch(`/tweets${query}`, {
      method: "GET",
    });
  }

  async postTweet(text: string): Promise<Tweet> {
    return this.http.fetch(`/tweets`, {
      method: "POST",
      body: JSON.stringify({ text, username: "jiheon", name: "Jiheon" }),
    });
  }

  async deleteTweet(tweetId: number) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "DELETE",
    });
  }

  async updateTweet(tweetId: number, text: string): Promise<Tweet> {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "PUT",
      body: JSON.stringify({ text }),
    });
  }

  onSync(callback: (...args: any[]) => any) {
    return this.socket.onSync("tweets", callback);
  }
}
