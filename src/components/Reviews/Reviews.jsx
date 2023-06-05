import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as API from '../../servises/api';

const Reviews = () => {
  const [reviews, setReviews] = useState();
  const [page] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    API.fetchMovieReviews(movieId, page)
      .then(responce => {
      //   console.log(responce);
        setReviews(responce);
        if (responce.length === 0) setShowMessage(true);
      })
      .catch(error => {
        console.log(error);
      });
  }, [movieId, page]);

  return (
    <>
      {!reviews ? (
        ''
      ) : (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>C{review.content}</p>
            </li>
          ))}
        </ul>
      )}
      {showMessage && "We don't have any reviews for this movie"}
    </>
  );
};

export default Reviews;