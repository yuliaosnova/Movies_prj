import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { toast } from "react-toastify";
import {
  getGenre,
  cutDate,
  setAddButtonText,
  getNamesFromArrow,
} from "../../utils/utils";
import css from "./GalleryItem.module.css";

const GalleryItem = ({
  movies,
  allGenres,
  genres,
  backdrop_path,
  id,
  title,
  genre_ids,
  release_date,
}) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userId = useSelector((state) => state.user.uid);
  const [collection, setCollection] = useState([]);
  const db = getDatabase();
  const location = useLocation();


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

  const addToCollection = (clickedMoviesID) => {
    if (!isLoggedIn) {
      toast.error("You must be authorized!");
      return;
    }

    const clickedMovie = movies.find((movie) => movie.id === clickedMoviesID);

    const alreadyInCollection = collection.find(
      (movie) => movie.id === clickedMoviesID
    );

    if (alreadyInCollection) {
      set(ref(db, "collections/" + userId + "/" + clickedMoviesID), null);
		toast("Deleted from collection");

    } else {
      set(
        ref(db, "collections/" + userId + "/" + clickedMoviesID),
        clickedMovie
      );
		toast("Added to collection");
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
        <span className={css.Text}>{setAddButtonText(id, collection)}</span>
      </button>
    </>
  );
};

export default GalleryItem;