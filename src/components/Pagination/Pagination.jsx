import { Gallery} from '../Gallery/Gallery'
import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

export function PaginatedItems({
  data,
  total,
  clickHandler,
  location,
  initialPage,
}) {
  const pageCount = total;

  const handlePageClick = event => {
    clickHandler(event.selected + 1);
  };

  return (
    <>
      <Gallery movies={data} location={location} />

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={8}
        pageCount={pageCount}
        previousLabel="< previous"
      //   renderOnZeroPageCount={null}
		//   prevRel={null}
		//   nextRel={null}
		// showPaginationBottom={false}
	
		
	
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
