import { memo } from "react";

type Props = {
  text: string;
  isAlert: boolean;
  transient: boolean;
};

const Banner = memo(({ text, isAlert }: Props) => (
  <>{text && <p className={`banner ${isAlert ? "banner-red" : "banner-green"}`}>{text}</p>}</>
));
Banner.displayName = "Banner";
export default Banner;
