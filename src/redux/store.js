import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';
import ratingReducer from './ratingSlice'; // Importera ratingReducer

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    ratings: ratingReducer, // Lägg till ratingReducer
  },
});

