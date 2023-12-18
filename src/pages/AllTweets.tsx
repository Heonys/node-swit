// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
import type TweetService from "@/service/tweet";

type Props = {
  tweetService: TweetService;
};
const AllTweets = ({ tweetService }: Props) => {
  // const {  } = useParams();

  const handdleClick = async () => {
    const data = await fetch(`${tweetService.baseUrl}/tweets`).then((res) => res.json());
    console.log("response ::", data);
  };

  return (
    <div>
      AllTweets
      <button onClick={handdleClick}>click</button>
    </div>
  );
};

export default AllTweets;
