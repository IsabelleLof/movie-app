import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Rating from '../components/Rating'; // Import the Rating component
import { addFavorite, removeFavorite, selectFavorites } from '../redux/movieSlice'; // Import actions and selector

const MovieDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const favorites = useSelector(selectFavorites); // Get the list of favorites

  // Check if the movie is already in favorites
  const isFavorite = favorites.some((favMovie) => favMovie.id === parseInt(id));

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=86f8955cac43b6e93132664afbcb0af0`
        );
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load movie details.');
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  // Handle the logic for adding/removing favorites
  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie)); // Remove from favorites
    } else {
      dispatch(addFavorite(movie)); // Add to favorites
    }
  };

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>No movie found.</p>;

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold">{movie.title}</h1>
      <p className="mt-4">{movie.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="my-4"
      />

      {/* Rating component */}
      <Rating movieId={id} /> {/* Pass movieId to Rating component */}

      {/* Button to add/remove from favorites */}
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

export default MovieDetailsPage;



