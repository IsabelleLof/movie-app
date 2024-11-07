import React from 'react';
import { useSelector } from 'react-redux';
import { selectFavorites } from '../redux/favoriteSlice'; // Import the selector from favoriteSlice
import MovieCard from './MovieCard';


// My component for displaying the user's favorite movies
const FavoritesList = () => {
  // Get the list of favorite movies from my favoriteSlice
  const favorites = useSelector(selectFavorites); // Updated to use selectFavorites from favoriteSlice

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Favorite Movies</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;


