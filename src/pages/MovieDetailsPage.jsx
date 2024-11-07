// Use fetch() instead

// Replaced axios with fetch: Used fetch to call the API and parse the response as JSON.
// Error Handling: Checked response.ok to handle errors if the fetch call fails.
// Cleaned up Code: Used try...catch with finally to set the loading state after the fetch call completes.

// MovieDetailsPage.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite, selectFavorites } from "../redux/favoriteSlice"; // Import actions and selector from favoriteSlice
import Rating from "../components/Rating";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const favorites = useSelector(selectFavorites);

  const isFavorite = favorites.some((favMovie) => favMovie.id === parseInt(id));

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
        if (!response.ok) {
          throw new Error("Failed to load movie details.");
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

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
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row items-start">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full sm:w-1/3"
        />
        <div className="sm:ml-6 mt-4 sm:mt-0">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-500">{movie.release_date}</p>
          <p className="mt-4">{movie.overview}</p>
          <Rating movieId={id} />
          <button
            onClick={handleFavoriteClick}
            className={`mt-4 p-2 rounded ${isFavorite ? "bg-red-600 text-white" : "bg-green-600 text-white"}`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;

