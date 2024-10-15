import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMovies } from '../redux/movieSlice';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchMovies(query)); // Fetch movies based on the search query
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
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
