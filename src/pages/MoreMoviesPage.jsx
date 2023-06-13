import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as API from "../servises/api";
import ScrollButton from "../components/ScrollButton/ScrollButton";
import { PaginatedItems } from "../components/Pagination/Pagination";

const MoreMovies = () => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
  });

  const page = searchParams.get("page");

  const initialPage = Number(page) - 1;

  const location = useLocation();

  const setCurrentPage = (number) => {
    setSearchParams({ page: number });
  };

  useEffect(() => {
    API.fetchTopRatedMovies(page)
      .then((resp) => {
        if (resp.total_pages <= 500) {
          setTotalPages(resp.total_pages);
        } else {
          setTotalPages(500);
        }

        setMovies(resp.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);


  useEffect(() => {
	
 }, [page]);


  return (
    <>
      <ScrollButton />
      <PaginatedItems
        data={movies}
        total={totalPages}
        clickHandler={setCurrentPage}
        location={location}
        initialPage={initialPage}
      />
    </>
  );
};

export default MoreMovies;
