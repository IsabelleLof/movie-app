import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/movieSlice';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.movies.favorites);
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <div className="border p-4 rounded shadow-lg">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-80 object-cover mb-4"
      />
      <h3 className="text-xl font-bold">{movie.title}</h3>
      <p>{movie.release_date}</p>
      <button
        onClick={handleFavoriteClick}
        className={`mt-4 p-2 rounded ${
          isFavorite ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
        }`}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default MovieCard;

