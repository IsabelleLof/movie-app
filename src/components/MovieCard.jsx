import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/movieSlice';
import Rating from './Rating'; // Importera Rating-komponenten

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.movies.favorites);

  const isFavorite = favorites.some((favMovie) => favMovie.id === movie.id); // Kolla om filmen är favorit

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <div className="border p-4 rounded shadow-lg">
      {/* Länka till filmens detaljer */}
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-80 object-cover mb-4"
        />
        <h3 className="text-xl font-bold">{movie.title}</h3>
      </Link>
      <p>{movie.release_date}</p>

      {/* Rating Component */}
      <Rating movieId={movie.id} /> {/* Lägg till Rating-komponenten för att sätta betyg */}

      {/* Knapp för att lägga till/ta bort från favoriter */}
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


