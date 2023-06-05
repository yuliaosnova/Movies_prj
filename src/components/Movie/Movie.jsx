import css from "./Movie.module.css";

export const Movie = ({ film, year }) => {
  const genres = film.genres;

  return (
    <>
      <div className={css.Film}>
        <div className={css.Info}>
          <h2 className={css.Title}>
            {film.title} ({year})
          </h2>
          <p className={css.Score}>User score: {film.vote_average}</p>
          <h3 className={css.Title}>Overview</h3>
          <p className={css.Overview}>{film.overview}</p>
          <h4 className={css.Title}>Genres</h4>
          <p className={css.Genres}>
            {genres &&
              genres.map((item) => <span key={item.id}> {item.name}</span>)}
          </p>
        </div>
      </div>
    </>
  );
};
