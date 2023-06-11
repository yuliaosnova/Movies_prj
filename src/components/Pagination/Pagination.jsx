import { Gallery } from "../Gallery/Gallery";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

export function PaginatedItems({
  data,
  total,
  clickHandler,
  location,
  initialPage,
}) {
  const pageCount = total;

  const handlePageClick = (event) => {
    clickHandler(event.selected + 1);
  };

  return (
    <>
      <div className={css.GalleryContainer}>
        <Gallery movies={data} location={location} />
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel="<"
        containerClassName={css.Pagination}
        pageLinkClassName={css.PageNum}
        previousLinkClassName={css.PageNum}
        nextLinkClassName={css.PageNum}
        activeLinkClassName={css.Active}
        initialPage={initialPage}
      />
    </>
  );
}
