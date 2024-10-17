import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Rating from "../components/Rating"; // Import the Rating component
import {
  addFavorite,
  removeFavorite,
  selectFavorites,
} from "../redux/movieSlice"; // Import actions and selector

// get the api key from .env
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

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
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load movie details.");
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

  // Extract director and cast info (if available)
  const director = movie?.credits?.crew?.find(
    (member) => member.job === "Director"
  );
  const topActors = movie?.credits?.cast?.slice(0, 5);

  return (
    <div className="container mx-auto p-4">
      {movie && (
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

            {director && (
              <p className="mt-4">
                <strong>Director: </strong>
                {director.name}
              </p>
            )}

            {topActors && (
              <div className="mt-4">
                <strong>Cast:</strong>
                <ul className="list-disc ml-6">
                  {topActors.map((actor) => (
                    <li key={actor.id}>
                      {actor.name} as {actor.character}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-4">
              <Rating movieId={id} /> {/* Pass movieId to Rating component */}
            </div>

            <div className="flex items-center mt-8 gap-2">
              <button className="bg-blue-600 text-white p-2 rounded">
              Watch the movie
              </button>

              <button
                onClick={handleFavoriteClick}
                className={`p-2 rounded ${
                  isFavorite ? "bg-red-600 text-white" : "bg-green-600 text-white"
                }`}
              >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;




