import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import { add, remove } from "../../redux/collectedMovieSlice";
import {
  getGenre,
  cutDate,
  setAddButtonText,
  getNamesFromArrow,
} from "../../utils/utils";

import css from "./MovieListItem.module.css";

const MovieListItem = ({
  movies,
  allGenres,
  genres,
  backdrop_path,
  id,
  title,
  genre_ids,
  release_date,
}) => {
  const collectedMovies = useSelector((state) => state.collectedMovies);
  const location = useLocation();
  const dispatch = useDispatch();

  const addToCollection = (clickedMoviesID) => {
    const clickedMovie = movies.find((movie) => movie.id === clickedMoviesID);
    const alreadyInCollection = collectedMovies.find(
      (movie) => movie.id === clickedMoviesID
    );
    if (alreadyInCollection) {
      toast("Deleted from collection");
      dispatch(remove(clickedMoviesID));
    } else {
      toast("Added to collection");
      dispatch(add(clickedMovie));
    }
  };

  return (
    <>
      <div className={css.Film}>
        <Link
          to={`/movies/${id}`}
          state={{ from: location }}
          className={css.Link}
        >
          <li key={id}>
            <img
              className={css.Image}
              src={
                backdrop_path
                  ? `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${backdrop_path}`
                  : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
              }
              alt=""
            ></img>
            <p className={css.Title}>{title}</p>
            <div className={css.ItemInfo}>
              <p>
                {genre_ids ? (
                  <span>{getGenre(allGenres, genre_ids).join(", ")}</span>
                ) : (
                  <span>{getNamesFromArrow(genres).join(", ")}</span>
                )}
              </p>
              <p className={css.Date}>
                <span>|</span>
                {cutDate(release_date)}
              </p>
            </div>
          </li>
        </Link>
      </div>
      <button className={css.Button} onClick={() => addToCollection(id)}>
        <span className={css.Icon}>+</span>
        <span className={css.Text}>
          {setAddButtonText(id, collectedMovies)}
        </span>
      </button>
    </>
  );
};

export default MovieListItem;
