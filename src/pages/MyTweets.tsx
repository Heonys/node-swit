import { useParams } from "react-router-dom";
import type TweetService from "@/service/tweet";
import Tweets from "@/components/Tweets";

type Props = {
  tweetService: TweetService;
};
const MyTweets = ({ tweetService }: Props) => {
  const { username } = useParams();

  return <Tweets tweetService={tweetService} username={username} addable={false} />;
};

export default MyTweets;
