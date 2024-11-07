import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import NavigationMenu from './components/NavigationMenu';

const App = () => {
  return (
    <Router>
      <NavigationMenu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/movies/:id" element={<MovieDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;

