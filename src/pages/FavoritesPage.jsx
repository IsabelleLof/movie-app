import React from 'react';
import FavoritesList from '../components/FavoritesList';

const FavoritesPage = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-4">Your Favorite Movies</h1>
      <FavoritesList />
    </div>
  );
};

export default FavoritesPage;
