import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';
import ratingReducer from './ratingSlice';
import { loadStateFromLocalStorage, saveStateToLocalStorage } from '../utils/localStorageUtils'; // Importera localStorage funktioner

// Ladda tillstånd från localStorage om det finns
const persistedState = loadStateFromLocalStorage();

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    ratings: ratingReducer,
  },
  preloadedState: persistedState, // Använd tillståndet från localStorage som initialt tillstånd
});

// Prenumerera på tillståndsförändringar och spara till localStorage
store.subscribe(() => {
  saveStateToLocalStorage({
    movies: store.getState().movies,   // Spara movies-tillstånd
    ratings: store.getState().ratings, // Spara ratings-tillstånd
  });
});
