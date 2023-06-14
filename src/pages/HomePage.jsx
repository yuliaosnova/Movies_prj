import Responsive from "../components/MovieList/MovieList";
import { useState, useEffect } from "react";
import * as API from "../servises/api";
import SimpleSlider from "../components/HeroSlider/HeroSlider";
import { MoreVideos } from "../components/MoreVideosBtn/MoreVideosBtn";

import css from "./Pages.module.css";
import { useGetGenresQuery } from "../redux/genresSlice";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [moviesForWeek, setMoviesForWeek] = useState([]);
  const [moviesTop, setMoviesTop] = useState([]);

  const { data } = useGetGenresQuery();
  const allGenres = data?.genres ?? [];

  useEffect(() => {
    API.fetchPopularMoviesForDay()
      .then((response) => {
        setMovies(response.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    API.fetchPopularMoviesForWeek()
      .then((response) => {
        setMoviesForWeek(response.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    API.fetchTopRatedMovies()
      .then((response) => {
        setMoviesTop(response.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const heroMoviesArr = movies.slice(0, 5);

  return (
    <>
      <section className="Hero">
        <SimpleSlider movies={heroMoviesArr} />
      </section>

      <section className={css.Section}>
        <h2 className={css.SectionTitle}>Trending today</h2>
        <div className={css.SliderContainer}>
          <Responsive movies={movies} genres={allGenres} />
        </div>
      </section>

      <section
        style={{
          backgroundColor: "#f7f3f3",
        }}
        className={css.Section}
      >
        <h2 className={css.SectionTitle}>Trending this week</h2>
        <div className={css.SliderContainer}>
          <Responsive movies={moviesForWeek} genres={allGenres} />
        </div>
      </section>

      <section className={css.Section}>
        <div className={css.SectionHead}>
          <h2 className={css.SectionTitle}>TOP RATED</h2>
          <MoreVideos />
        </div>
        <div className={css.SliderContainer}>
          <Responsive movies={moviesTop} genres={allGenres} />
        </div>
      </section>
    </>
  );
};

export default Home;
