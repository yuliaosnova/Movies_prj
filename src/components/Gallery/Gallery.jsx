import MovieListItem from "../MovieListItem/MovieListItem";
import { useGetGenresQuery } from "../../redux/genresSlice";
import css from "./Gallery.module.css";

export const Gallery = ({ movies }) => {
  const { data } = useGetGenresQuery();
  const allGenres = data.genres;

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
