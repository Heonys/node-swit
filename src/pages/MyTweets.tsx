import React from "react";
import { useParams } from "react-router-dom";
import type TweetService from "@/service/tweet";

type Props = {
  tweetService: TweetService;
};
const MyTweets = ({ tweetService }: Props) => {
  const { username } = useParams();
  return <div>MyTweets {username}</div>;
};

export default MyTweets;
