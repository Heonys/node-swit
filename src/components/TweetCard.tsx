import { memo, useState } from "react";
import parseDate from "../util/data";
import Avatar from "./Avatar";
import EditTweetForm from "./EditTweetForm";
import { Tweet } from "@/service/tweet";

type Props = {
  tweet: Tweet;
  owner: boolean;
  onDelete: (tweetId: number) => void;
  onUpdate: (tweetId: number, text: string) => Promise<any>;
  onUsernameClick: (tweet: Tweet) => void;
};

const TweetCard = memo(({ tweet, owner, onDelete, onUpdate, onUsernameClick }: Props) => {
  const { id, username, name, url, text, createdAt } = tweet;
  const [editing, setEditing] = useState(false);
  const onClose = () => setEditing(false);

  return (
    <li className="tweet">
      <section className="tweet-container">
        <Avatar url={url} name={name} />
        <div className="tweet-body">
          <span className="tweet-name">{name}</span>
          <span className="tweet-username" onClick={() => onUsernameClick(tweet)}>
            @{username}
          </span>
          <span className="tweet-date"> · {parseDate(createdAt as string)}</span>
          <p>{text}</p>
          {editing && <EditTweetForm tweet={tweet} onUpdate={onUpdate} onClose={onClose} />}
        </div>
      </section>
      {owner && (
        <div className="tweet-action">
          <button className="tweet-action-btn" onClick={() => onDelete(id)}>
            t
          </button>
          <button className="tweet-action-btn" onClick={() => setEditing(true)}>
            ✎
          </button>
        </div>
      )}
    </li>
  );
});
TweetCard.displayName = "TweetCard";
export default TweetCard;
