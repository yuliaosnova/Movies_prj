import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MyCollectionPage from "./pages/MyCollectionPage";
import { Layout } from "./components/Layout/Layout";

const Home = lazy(() => import("./pages/HomePage"));
const SearchedMovies = lazy(() => import("./pages/SearchPage"));
const MoreMovies = lazy(() => import("./pages/MoreMoviesPage"));
const MovieDetails = lazy(() => import("./pages/MovieDetailsPage"));

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<SearchedMovies />} />
          <Route path="more" element={<MoreMovies />}></Route>
          <Route path="movies/:movieId" element={<MovieDetails />}></Route>
          <Route path="collection" element={<MyCollectionPage />}></Route>
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
