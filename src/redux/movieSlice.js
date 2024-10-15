// En slice för hantering av filmer och favoriter

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Hämta filmer från TMDB API
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (query) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          api_key: "DIN_API_NYCKEL",
          query: query,
        },
      }
    );
    return response.data.results;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    favorites: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
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

export const { addFavorite, removeFavorite } = movieSlice.actions;
export default movieSlice.reducer;
