import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import MyCollectionPage from "./pages/MyCollectionPage";
import { Layout } from "./components/Layout/Layout";

import css from "./App.module.css";

// import Home from "./pages/HomePage";
// import SearchedMovies from "./pages/SearchPage";
// import MoreMovies from "./pages/MoreMoviesPage";
// import MovieDetails from "./pages/MovieDetailsPage";

// import Cast from "./components/Cast/Cast";
// import Reviews from "./components/Reviews/Reviews";


const Home = lazy(() => import("./pages/HomePage"));
const SearchedMovies = lazy(() => import("./pages/SearchPage"));
const MoreMovies = lazy(() => import("./pages/MoreMoviesPage"));
const MovieDetails = lazy(() => import("./pages/MovieDetailsPage"));

// const Cast = lazy(() => import("./components/Cast/Cast"));
const Reviews = lazy(() => import("./components/Reviews/Reviews"));

const App = () => {
  return (
    <div className={css.Container}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<SearchedMovies />} />
          <Route path="more" element={<MoreMovies />}></Route>
          <Route path="movies/:movieId" element={<MovieDetails />}>
            {/* <Route path="cast" element={<Cast />} /> */}
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="collection" element={<MyCollectionPage />}></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
