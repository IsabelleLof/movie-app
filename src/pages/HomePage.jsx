import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPopularMovies,
  fetchMovies,
  selectMovies,
  selectLoading,
  selectError,
} from "../redux/movieSlice";
import {
  addFavorite,
  removeFavorite,
  selectFavorites,
} from "../redux/favoriteSlice"; // Updated imports for favorites
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";

const HomePage = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const favorites = useSelector(selectFavorites); // Access favorites from favoriteSlice

  // Fetch popular movies on component load
  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  // Handle search
  const handleSearch = (query) => {
    if (query) {
      dispatch(fetchMovies(query)); // Fetch movies based on search query
    } else {
      dispatch(fetchPopularMovies()); // Show popular movies if search is empty
    }
  };

  // Function to add or remove a favorite movie
  const toggleFavorite = (movie) => {
    if (favorites.some((fav) => fav.id === movie.id)) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mt-8 mb-4">
        Welcome to the best movie library ever
      </h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p className="text-center">Loading...</p>}
      <MovieList movies={movies} onToggleFavorite={toggleFavorite} favorites={favorites} />
    </div>
  );
};

export default HomePage;


