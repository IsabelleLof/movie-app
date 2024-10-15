import React from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';

const HomePage = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-4">Welcome to Hemmakvälls Movie Library</h1>
      <SearchBar />
      <MovieList />
    </div>
  );
};

export default HomePage;
