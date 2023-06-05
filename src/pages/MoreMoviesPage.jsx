import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as API from '../servises/api';
import ScrollButton from '../components/ScrollButton/ScrollButton';
import css from './Pages.module.css';
import { PaginatedItems } from '../components/Pagination/Pagination';

const MoreMovies = () => {
  
  const [movies, setMovies] = useState([]);
  //   const [page, setPage] = useState(1);
  const [showMessage, setShowMessage] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const page = searchParams.get('page');
  const initialPage = Number(page) - 1;

  const location = useLocation();

  const setCurrentPage = number => {
   //  console.log('page', number);
    setSearchParams({ page: number });
  };


  useEffect(() => {
    API.fetchTopRatedMovies(page)
      .then(resp => {
      //   const total = resp.total_pages;
      //   console.log('totalPages', total);

        if (resp.total_pages <= 500) {
          setTotalPages(resp.total_pages);
        } else {
          setTotalPages(500);
        }

        setShowMessage(false);
        if (resp.length === 0) setShowMessage(true);
        //   setMoviesBySeach(moviesBySeach => [...moviesBySeach, ...resp]);
        setMovies(resp.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, [page]);

  return (
    <>
      <div className={css.MoreMoviesContainer}>
        {/* <Gallery movies={movies} location={location} /> */}
        {showMessage && 'No matching results'}
      </div>
      <ScrollButton />
      <PaginatedItems
        //   itemsPerPage={4}
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
