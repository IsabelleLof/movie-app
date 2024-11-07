// MovieCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite, selectFavorites } from "../redux/favoriteSlice"; // Import actions and selector from favoriteSlice
import Rating from "./Rating"; // Import Rating component

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites); // Use selector from favoriteSlice

  const isFavorite = favorites.some((favMovie) => favMovie.id === movie.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie)); // Remove movie from favorites
    } else {
      dispatch(addFavorite(movie)); // Add movie to favorites
    }
  };

  return (
    <div className="border p-4 rounded shadow-lg">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-80 object-cover mb-4"
        />
        <h3 className="text-xl font-bold">{movie.title}</h3>
      </Link>
      <p>{movie.release_date}</p>
      <Rating movieId={movie.id} />
      <button
        onClick={handleFavoriteClick}
        className={`mt-4 p-2 rounded ${isFavorite ? "bg-red-600 text-white" : "bg-green-600 text-white"}`}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default MovieCard;


