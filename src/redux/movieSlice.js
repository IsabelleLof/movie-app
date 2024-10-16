import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch popular movies from TMDB API
export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular`,
      {
        params: {
          // api_key: "86f8955cac43b6e93132664afbcb0af0",
        },
      }
    );
    return response.data.results; // Return the list of popular movies
  }
);

// Thunk to search for movies based on a query
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (query) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          // api_key: "86f8955cac43b6e93132664afbcb0af0",
          query: query,
        },
      }
    );
    return response.data.results; // Return the search results
  }
);

// Initial state
const initialState = {
  movies: [], // Store for movies (either popular or search results)
  favorites: [], // List of favorite movies
  status: "idle", // Loading status: idle, loading, succeeded, failed
  error: null, // Store any errors
};

// Create movieSlice using Redux Toolkit
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload); // Add movie to favorites
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (movie) => movie.id !== action.payload.id // Remove movie from favorites
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle popular movies fetch
      .addCase(fetchPopularMovies.pending, (state) => {
        state.status = "loading"; // Set loading status to 'loading'
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to 'succeeded'
        state.movies = action.payload; // Populate movies with popular movies
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.status = "failed"; // Set status to 'failed'
        state.error = action.error.message; // Store the error message
      })

      // Handle movie search
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading"; // Set loading status to 'loading'
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to 'succeeded'
        state.movies = action.payload; // Populate movies with search results
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed"; // Set status to 'failed'
        state.error = action.error.message; // Store the error message
      });
  },
});

// Export actions for adding and removing favorites
export const { addFavorite, removeFavorite } = movieSlice.actions;

// Selectors to access movies, favorites, loading state, and errors from the state
export const selectMovies = (state) => state.movies.movies;
export const selectFavorites = (state) => state.movies.favorites;
export const selectLoading = (state) => state.movies.status === "loading";
export const selectError = (state) => state.movies.error;

// Export the reducer to be used in the store
export default movieSlice.reducer;

