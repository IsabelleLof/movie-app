// store.js
import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';
import ratingReducer from './ratingSlice';
import favoriteReducer from './favoriteSlice'; // Import the favoriteSlice reducer
import { loadStateFromLocalStorage, saveStateToLocalStorage } from '../utils/localStorageUtils';

// Load the persisted state from localStorage if available
const persistedState = loadStateFromLocalStorage();

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    ratings: ratingReducer,
    favorites: favoriteReducer, // Add favorites reducer to the store
  },
  preloadedState: persistedState, // Use localStorage state as the initial state
});

// Subscribe to store updates and save to localStorage
store.subscribe(() => {
  saveStateToLocalStorage({
    movies: store.getState().movies,
    ratings: store.getState().ratings,
    favorites: store.getState().favorites, // Save favorites state
  });
});

export default store;



