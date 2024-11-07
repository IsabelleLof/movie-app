// Use fetch instead, fetch returns a Response object, 
// so we call .json() to parse the JSON body.
// movieSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

// Thunk to fetch popular movies from TMDB API
export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
      );
      if (!response.ok) throw new Error("Failed to fetch popular movies.");
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching popular movies:", error);
      throw error;
    }
  }
);

// Thunk to search for movies based on a query
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (query) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
      );
      if (!response.ok) throw new Error("Failed to fetch movies.");
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error searching movies:", error);
      throw error;
    }
  }
);

const initialState = {
  movies: [],
  status: "idle",
  error: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export selectors
export const selectMovies = (state) => state.movies.movies;
export const selectLoading = (state) => state.movies.status === "loading";
export const selectError = (state) => state.movies.error;

export default movieSlice.reducer;



