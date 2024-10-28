// Use fetch instead and implemneting better error handling if response is not okay - throw error

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

// Thunk to fetch favorite movies from a server or an API (optional, depends on your needs)
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async () => {
    try {
      const response = await fetch(
        `https://api.example.com/favorites?api_key=${apiKey}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch favorites.");
      }
      const data = await response.json();
      return data; // Return fetched data
    } catch (error) {
      console.error(error);
      throw error;
    }
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
      // Check if the movie already exists in favorites
      const movieExists = state.items.some(item => item.id === action.payload.id);
      if (!movieExists) {
        state.items.push(action.payload); // Add movie if it doesn't already exist

        // Send event to Google Tag Manager (GTM)
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

      // Send event to Google Tag Manager (GTM)
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
