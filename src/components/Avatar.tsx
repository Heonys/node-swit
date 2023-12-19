import { memo } from "react";

type Props = {
  url?: string;
  name: string;
};

const Avatar = memo(({ url, name }: Props) => (
  <div>
    {url ? (
      <img src={url} alt="avatar" className="avatar-img" />
    ) : (
      <div className="avatar-txt">{name && name.charAt(0)}</div>
    )}
  </div>
));
Avatar.displayName = "Avatar";

export default Avatar;
