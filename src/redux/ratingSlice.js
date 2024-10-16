import { createSlice } from '@reduxjs/toolkit';

// Initial state for ratings
const initialState = {
  ratings: {}, // { movieId: rating }
};

const ratingSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    setRating: (state, action) => {
      const { movieId, rating } = action.payload;
      state.ratings[movieId] = rating; // Sätt betyget för en specifik film
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRating } = ratingSlice.actions;

// Selector to get rating for a specific movie
export const selectRating = (state, movieId) => state.ratings.ratings[movieId] || 0;

// Export the reducer to use it in the store
export default ratingSlice.reducer;
