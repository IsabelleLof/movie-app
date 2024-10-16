import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

// Thunk to fetch favorite movies from a server or an API (optional, depends on your needs)
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async () => {
    // If you had a backend API to fetch saved favorites, you could use it here.
    // For this example, we return an empty list as we assume the favorites are stored locally.
    return [];
  }
);

// Initial state
const initialState = {
  items: [], // List of favorite movies
  status: "idle", // Loading status: idle, loading, succeeded, failed
  error: null, // Store any errors
};

// Create favoriteSlice using Redux Toolkit
const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      // Kontrollera om filmen redan finns i favoriter
      const movieExists = state.items.some(item => item.id === action.payload.id);
      if (!movieExists) {
        state.items.push(action.payload); // Lägg till filmen om den inte redan finns

        // Skicka händelsen till Google Tag Manager (GTM)
        if (window && window.dataLayer) {
          window.dataLayer.push({
            event: "add_to_favorite",
            favoriteItem: {
              id: action.payload.id,
              title: action.payload.title,
            },
          });
        }
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      // Skicka händelsen till Google Tag Manager (GTM)
      if (window && window.dataLayer) {
        window.dataLayer.push({
          event: "remove_from_favorite",
          favoriteItem: {
            id: action.payload,
          },
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetching favorites (if using a backend or local storage sync)
      .addCase(fetchFavorites.pending, (state) => {
        state.status = "loading"; // Set loading status to 'loading'
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to 'succeeded'
        state.items = action.payload; // Populate favorites with fetched data
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = "failed"; // Set status to 'failed'
        state.error = action.error.message; // Store the error message
      });
  },
});

// Export actions for adding and removing favorites
export const { addFavorite, removeFavorite } = favoriteSlice.actions;

// Selectors to access favorites, loading state, and errors from the state
export const selectFavorites = (state) => state.favorites.items;
export const selectFavoritesLoading = (state) => state.favorites.status === "loading";
export const selectFavoritesError = (state) => state.favorites.error;

// Export the reducer to be used in the store
export default favoriteSlice.reducer;



