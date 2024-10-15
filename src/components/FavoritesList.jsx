import React from 'react';
import { useSelector } from 'react-redux';
import MovieCard from './MovieCard';

const FavoritesList = () => {
  const favorites = useSelector((state) => state.movies.favorites);

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

