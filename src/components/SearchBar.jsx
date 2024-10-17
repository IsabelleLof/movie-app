import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMovies } from '../redux/movieSlice';

// Debounce function to delay the search input handling
const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const SearchBar = () => {
  const [query, setQuery] = useState(() => {
    const savedQuery = localStorage.getItem('searchQuery');
    console.log("Loaded query from localStorage:", savedQuery); // Debug: Log query from localStorage
    return savedQuery || '';
  });
  const dispatch = useDispatch();

  // Debounced search handler
  const debouncedSearch = debounce((query) => {
    if (query.trim() !== '') {
      console.log("Searching for:", query); // Debug: Log the query being searched
      dispatch(fetchMovies(query)); // Fetch movies if query is not empty
      localStorage.setItem('searchQuery', query); // Save search query to localStorage
    }
  }, 500); // 500ms delay for debouncing

  const handleInputChange = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    debouncedSearch(searchQuery); // Trigger the debounced search
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      console.log("Submitting search for:", query); // Debug: Log query on form submission
      dispatch(fetchMovies(query)); // Fetch movies on form submission
      localStorage.setItem('searchQuery', query); // Save search query to localStorage
    }
  };

  // Load search query from localStorage when component mounts
  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      setQuery(savedQuery);
      console.log("Dispatching fetchMovies for saved query:", savedQuery); // Debug: Log saved query being dispatched
      dispatch(fetchMovies(savedQuery)); // Fetch movies if there's a saved query
    }
  }, [dispatch]);

  return (
    <form onSubmit={handleSearch} className="flex justify-center p-4">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for movies..."
        className="border rounded p-2 w-1/2"
      />
      <button type="submit" className="ml-2 p-2 bg-blue-600 text-white rounded">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
