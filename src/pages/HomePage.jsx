import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPopularMovies,
  fetchMovies,
  selectMovies,
  selectLoading,
  selectError,
} from "../redux/movieSlice";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";

const HomePage = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  // Hämta populära filmer när komponenten laddas
  useEffect(() => {
    dispatch(fetchPopularMovies()); // Hämta populära filmer
  }, [dispatch]);

  // Hantera sökning
  const handleSearch = (query) => {
    if (query) {
      dispatch(fetchMovies(query)); // Sök filmer
    } else {
      dispatch(fetchPopularMovies()); // Visa populära filmer om sökfältet är tomt
    }
  };

  return (
    <div className="container mx-auto">
      <h1>Welcome to the best movie library ever</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;

