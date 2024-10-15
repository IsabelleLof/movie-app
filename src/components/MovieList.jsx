import React from 'react';
import MovieCard from './MovieCard';
import { useSelector } from 'react-redux';

const MovieList = () => {
  const { movies, status, error } = useSelector((state) => state.movies);

  if (status === 'loading') {
    return <p>Loading movies...</p>;
  }

  if (status === 'failed') {
    return <p>Error loading movies: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
