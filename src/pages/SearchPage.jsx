import { Link, useSearchParams, useLocation } from "react-router-dom";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import * as API from "../servises/api";
import { cutDate } from "../utils/utils";
import GenresBar from "../components/GenresBar/GenresBar";
import { Gallery } from "../components/Gallery/Gallery";
import css from "./Pages.module.css";

const SearchedMovies = () => {
  const [moviesBySeach, setMoviesBySeach] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [page, setPage] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams({
    query: "",
    genre: "",
  });
  const query = searchParams.get("query") ?? "";
  const filter = searchParams.get("genre") ?? "";

  useEffect(() => {
    if (query === "") {
      setShowMessage(false);
      return; //first render
    }

    API.fetchSerchedMovies(query, page)
      .then((resp) => {
        setShowMessage(false);
        if (resp.length === 0) setShowMessage(true);
        setMoviesBySeach(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, query]);

  useEffect(() => {
    if (filter === "") {
      return;
    }

    API.fetchMovieByGenre(filter)
      .then((resp) => {
        setShowMessage(false);
        if (resp.length === 0) setShowMessage(true);
        setMoviesByGenre(resp.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filter]);

  const getFilteredValue = (value) => {
    setSearchParams({ query: "", genre: value });
    setMoviesBySeach([]);
  };

  const changeQuery = (searchQuery) => {
    if (searchQuery === query) return;

    if (searchQuery === "") {
      setMoviesByGenre([]);
      setSearchParams({ query: "", genre: searchParams });
      return;
    }

    setMoviesBySeach([]);
    setMoviesByGenre([]);
    setSearchParams({ query: searchQuery, genre: "" });
  };

  return (
    <div>
      <div className={css.SearchGanresContainer}>
        <SearchBar onSubmit={changeQuery} />
      </div>

      <ul className={css.List}>
        {moviesBySeach.map((item) => (
          <li key={item.id} className={css.ListItem}>
            <Link
              to={`/movies/${item.id}`}
              state={{ from: location }}
              className={css.Link}
            >
              <div className={css.ItemInfo}>
                <p className={css.Title}>{item.title}</p>
                <p className={css.Date}>
                  <span>|</span>
                  {cutDate(item.release_date)}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className={css.SerchedContainer}>
        {moviesByGenre && <Gallery movies={moviesByGenre} />}
      </div>

      <GenresBar placeHolder="Others" getFilteredValue={getFilteredValue} />

      {showMessage && <p className={css.FailMessage}>No matching results</p>}
    </div>
  );
};

export default SearchedMovies;
