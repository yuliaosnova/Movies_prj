import css from "../MoreVideosBtn/MoreVideosBtn.module.css";
import { Link } from "react-router-dom";

export const MoreVideos = () => {
  return (
    <Link to="/more">
      <button className={css.MoreBtn}>MORE VIDEOS</button>
    </Link>
  );
};
