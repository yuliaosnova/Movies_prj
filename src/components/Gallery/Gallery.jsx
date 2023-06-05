import { useEffect, useState } from "react";

import MovieListItem from "../MovieListItem/MovieListItem";
import * as API from "../../servises/api";
import css from "./Gallery.module.css";

export const Gallery = ({ movies }) => {
  const [allGenres, setGenres] = useState([]);

  //Функція для отримання списку жанрів при маунті компонента
  useEffect(() => {
    API.fetchGenres().then((response) => {
      const movieGenres = response.genres;
      console.log("movieGenres", movieGenres);
      setGenres(movieGenres);
    });
  }, []);

  return (
    <ul className={css.GalleryContainer}>
      {movies.map((item) => (
        <div className={css.ItemContainer} key={item.id}>
          <MovieListItem
            movies={movies}
            allGenres={allGenres}
            genres={item.genres}
            backdrop_path={item.backdrop_path}
            id={item.id}
            title={item.title}
            genre_ids={item.genre_ids}
            release_date={item.release_date}
          />
        </div>
      ))}
    </ul>
  );
};
