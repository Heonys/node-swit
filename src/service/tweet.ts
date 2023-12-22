import type { HttpClient } from "@/client/http";

export interface Tweet {
  id: number;
  text: string;
  createdAt: Date | string;
  name: string;
  username: string;
  url?: string;
}

export default class TweetService {
  constructor(public http: HttpClient) {
    this.http = http;
  }

  async getTweets(username?: string): Promise<Tweet[]> {
    const query = username ? `?username=${username}` : "";
    return this.http.fetch(`/tweets${query}`);
  }

  async postTweet(text: string): Promise<Tweet[]> {
    const tweet = {
      text,
      username: "jiheon",
      name: "Jiheon",
    };

    return this.http.fetch(`/tweets`, {
      method: "POST",
      body: JSON.stringify(tweet),
    });
  }

  async deleteTweet(tweetId: number) {
    return this.http.fetch(`/tweets/${tweetId}`, { method: "DELETE" });
  }

  async updateTweet(tweetId: number, text: string): Promise<Tweet> {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "PUT",
      body: JSON.stringify({ text }),
    });
  }
}
