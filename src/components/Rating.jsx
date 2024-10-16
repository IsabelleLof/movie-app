import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRating, selectRating } from '../redux/ratingSlice';

const Rating = ({ movieId }) => {
  const dispatch = useDispatch();
  const rating = useSelector((state) => selectRating(state, movieId)); // Hämta betyget för en specifik film

  // Funktion för att uppdatera betyg
  const handleRatingClick = (newRating) => {
    dispatch(setRating({ movieId, rating: newRating })); // Uppdatera betyg i Redux-storen
  };

  return (
    <div className="flex items-center">
      {/* Visa 5 stjärnor för betyg */}
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRatingClick(star)}
          className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default Rating;
