interface Tweet {
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
  tweets: Tweet[] = [
    {
      id: 1,
      text: "드림코딩에서 강의 들으면 너무 좋으다",
      createdAt: "2021-05-09T04:20:57.000Z",
      name: "Bob",
      username: "bob",
      url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
    },
  ];

  async getTweets(username: string) {
    return username ? this.tweets.filter((tweet) => tweet.username === username) : this.tweets;
  }

  async postTweet(text: string) {
    const tweet = {
      id: Date.now(),
      createdAt: new Date(),
      name: "Ellie",
      username: "ellie",
      text,
    };
    this.tweets.push(tweet);
    return tweet;
  }

  async deleteTweet(tweetId: number) {
    this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId);
  }

  async updateTweet(tweetId: number, text: string) {
    const tweet = this.tweets.find((tweet) => tweet.id === tweetId);
    if (!tweet) {
      throw new Error("tweet not found!");
    }
    tweet.text = text;
    return tweet;
  }
}
