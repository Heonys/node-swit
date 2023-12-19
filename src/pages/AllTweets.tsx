// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
import Tweets from "@/components/Tweets";
import type TweetService from "@/service/tweet";

type Props = {
  tweetService: TweetService;
};
const AllTweets = ({ tweetService }: Props) => {
  return <Tweets tweetService={tweetService} addable={true} />;
};

export default AllTweets;
