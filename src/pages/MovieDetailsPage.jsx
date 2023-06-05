import { toast } from "react-toastify";

import { Movie } from "../components/Movie/Movie";
import { useEffect, useRef, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import * as API from "../servises/api";
import { cutDate, setAddButtonText } from "../utils/utils";
import css from "./Pages.module.css";
import { Player } from "../components/Player/Player";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/collectedMovieSlice";

const MovieDetails = () => {
  const [film, setFilm] = useState({});

  const [traillerKey, setTraillerKey] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const { movieId } = useParams();

  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? "/movies");

  const collectedMovies = useSelector((state) => state.collectedMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    API.fetchMovieDetails(movieId)
      .then((response) => {
        setFilm(response);

        if (film.release_date) {
          const year = cutDate(film.release_date);
          setReleaseYear(year);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [film.release_date, movieId]);

  useEffect(() => {
    API.fetchMovieVideo(movieId)
      .then((response) => {
        setTraillerKey(response.results[0].key);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieId]);

  const addToCollection = (film) => {
    const alreadyInCollection = collectedMovies.find(
      (movie) => movie.id === film.id
    );
    if (alreadyInCollection) {
      toast("Deleted from collection");
      dispatch(remove(film.id));
    } else {
      toast("Added to collection");
      dispatch(add(film));
    }
  };

  return (
    <div
      className={css.DetailPageContainer}
      style={{
        backgroundImage: `linear-gradient(to right,
		rgba(47, 48, 58, 0.8),
		rgba(47, 48, 58, 0.8)), url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${film.backdrop_path})`,
      }}
    >
      <div className={css.InfoContainer}>
        <div className={css.BtnContainer}>
          <Link to={backLinkLocationRef.current}>
            <button className={css.Btn}>← Go back</button>
          </Link>

          <button className={css.Btn} onClick={() => addToCollection(film)}>
           
            <span className={css.Text}>
              {setAddButtonText(film.id, collectedMovies)}
            </span>
          </button>
        </div>

        {Object.keys(film).length > 0 && (
          <Movie film={film} year={releaseYear} />
        )}
      </div>

      <Player traillerKey={traillerKey} />
    </div>
  );
};

export default MovieDetails;
