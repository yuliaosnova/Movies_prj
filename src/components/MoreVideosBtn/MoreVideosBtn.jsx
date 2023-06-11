import { Link } from "react-router-dom";
import css from "../MoreVideosBtn/MoreVideosBtn.module.css";

export const MoreVideos = () => {
  return (
    <Link to="/more">
      <button className={css.MoreBtn}>MORE VIDEOS</button>
    </Link>
  );
};
