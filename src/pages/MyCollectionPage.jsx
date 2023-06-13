import { useSearchParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getDatabase, onValue, ref } from "firebase/database";
import { PaginatedItems } from "../components/Pagination/Pagination";
import { Gallery } from "../components/Gallery/Gallery";
import css from "./Pages.module.css";

const MyCollectionPage = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userId = useSelector((state) => state.user.uid);

  const [collection, setCollection] = useState([]);

  const db = getDatabase();

  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const [itemOffset, setItemOffset] = useState(0);
  const page = searchParams.get("page");
  const initialPage = Number(page) - 1;
  const itemsPerPage = 12;
  
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = collection.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(collection.length / itemsPerPage);


  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const collectionRef = ref(db, "collections/" + userId);
    const unsubscribe = onValue(collectionRef, (snapshot) => {
      const data = snapshot.val();
      const array = Object.values(data);

      setCollection(array);
    });

    return () => {
      unsubscribe();
    };
  }, [db, isLoggedIn, userId]);

  const setCurrentPage = (number) => {
    setSearchParams({ page: number });
  };

  const handlePageClick = (event) => {
    const newOffset = ((event - 1) * itemsPerPage) % collection.length;
    setItemOffset(newOffset);
    setCurrentPage(event);
  };

  return (
    <>
      {!isLoggedIn && <p className={css.UnauthorizeMessage}>You should authorize to use this functionality</p>}
      {isLoggedIn && collection.length <= 12 && <Gallery movies={collection} />}

      {isLoggedIn && collection.length > 12 && (
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