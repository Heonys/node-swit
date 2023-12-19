export interface Tweet {
  id: number;
  text: string;
  createdAt: Date | string;
  name: string;
  username: string;
  url?: string;
}

export default class TweetService {
  constructor(public baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getTweets(username?: string): Promise<Tweet[]> {
    const query = username ? `?username=${username}` : "";

    const response = await fetch(`${this.baseUrl}/tweets${query}`, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    if (response.status !== 200) {
      throw new Error("server error");
    }
    return data;
  }

  async postTweet(text: string): Promise<Tweet[]> {
    const tweet = {
      text,
      username: "jiheon",
      name: "Jiheon",
    };

    const response = await fetch(`${this.baseUrl}/tweets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tweet),
    });

    const data = await response.json();

    if (response.status !== 201) {
      throw new Error("server error");
    }
    return data;
  }

  async deleteTweet(tweetId: number) {
    const response = await fetch(`${this.baseUrl}/tweets/${tweetId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 204) {
      throw new Error("server error");
    }
  }

  async updateTweet(tweetId: number, text: string): Promise<Tweet> {
    const response = await fetch(`${this.baseUrl}/tweets/${tweetId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();

    if (response.status !== 200) {
      throw new Error("server error");
    }
    return data;
  }
}
