import React, { useState } from 'react';
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

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  // Debounced search handler
  const debouncedSearch = debounce((query) => {
    if (query.trim() !== '') {
      dispatch(fetchMovies(query)); // Fetch movies if query is not empty
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
      dispatch(fetchMovies(query)); // Fetch movies on form submission
    }
  };

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

