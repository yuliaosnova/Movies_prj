import { useEffect, useRef, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { Movie } from "../components/Movie/Movie";
import * as API from "../servises/api";
import { cutDate, setAddButtonText } from "../utils/utils";
import { Player } from "../components/Player/Player";
import css from "./Pages.module.css";


const MovieDetails = () => {
  const [film, setFilm] = useState({});
  console.log("FILM", film)

  const [traillerKey, setTraillerKey] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const { movieId } = useParams();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? "/movies");
  const userId = useSelector((state) => state.user.uid);
  const [collection, setCollection] = useState([]);
  const db = getDatabase();


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

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const collectionRef = ref(db, "collections/" + userId);
    const unsubscribe = onValue(collectionRef, (snapshot) => {
      const data = snapshot.val();
      const array = Object.values(data);

      setCollection(array);
    });

    return () => {
      unsubscribe();
    };
  }, [db, isLoggedIn, userId]);

  const addToCollection = (movieId) => {
    if (!isLoggedIn) {
      toast.error("You must be authorized!");
      return;
    }

    const alreadyInCollection = collection.find(
      (movie) => movie.id === movieId
    );

    if (alreadyInCollection) {
      set(ref(db, "collections/" + userId + "/" + movieId), null);
      toast("Deleted from collection");

    } else {
      set(
        ref(db, "collections/" + userId + "/" + movieId),
        film
      );
      toast("Added to collection");
    }
  };

  return (
    <div
      className={css.DetailPageContainer}
      style={{
        backgroundImage: `linear-gradient(to right,
		rgb(47, 48, 58, 0.8),
		rgba(47, 48, 58, 0.8)), url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${film.backdrop_path})`,
      }}
    >
      <div className={css.InfoContainer}>
        <div className={css.BtnContainer}>
          <Link to={backLinkLocationRef.current}>
            <button className={css.Btn}>← Go back</button>
          </Link>

          <button className={css.Btn} onClick={() => addToCollection(film.id)}>
            <span className={css.Text}>
              {setAddButtonText(film.id, collection)}
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
