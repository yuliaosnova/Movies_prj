import { useSearchParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

import { PaginatedItems } from "../components/Pagination/Pagination";
import { Gallery } from "../components/Gallery/Gallery";

const MyCollectionPage = () => {
  const collectedMovies = useSelector((state) => state.collectedMovies);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const page = searchParams.get("page");
  const initialPage = Number(page) - 1;

  const setCurrentPage = (number) => {
    setSearchParams({ page: number });
  };

  const itemsPerPage = 12;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = collectedMovies.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(collectedMovies.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = ((event - 1) * itemsPerPage) % collectedMovies.length;
    setItemOffset(newOffset);
    setCurrentPage(event);
  };

  return (
    <>
      {collectedMovies.length <= 12 && <Gallery movies={collectedMovies} />}

      {collectedMovies.length > 12 && (
        <PaginatedItems
          itemsPerPage={itemsPerPage}
          data={currentItems}
          total={pageCount}
          clickHandler={handlePageClick}
          location={location}
          initialPage={initialPage}
          showPagination={false}
        />
      )}
    </>
  );
};

export default MyCollectionPage;
