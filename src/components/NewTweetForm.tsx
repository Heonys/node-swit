import TweetService from "@/service/tweet";
import { ChangeEvent, FormEvent, useState } from "react";

type Props = {
  tweetService: TweetService;
  onError: (error: string) => void;
};

const NewTweetForm = ({ tweetService, onError }: Props) => {
  const [tweet, setTweet] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    tweetService
      .postTweet(tweet)
      .then(() => {
        setTweet("");
        // onCreated(created);
      })
      .catch(onError);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTweet(event.target.value);
  };

  return (
    <form className="tweet-form" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Edit your tweet"
        value={tweet}
        required
        autoFocus
        onChange={onChange}
        className="form-input tweet-input"
      />
      <button type="submit" className="form-btn">
        Post
      </button>
    </form>
  );
};

export default NewTweetForm;
