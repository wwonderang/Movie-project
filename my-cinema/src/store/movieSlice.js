import { createSlice } from "@reduxjs/toolkit";

import { requestMovies } from "../components/thunks/requestMovies";

const initialState = {
  movies: [],
  isLoading: false,
  isError: false,
};

export const movieSlice = createSlice({
  name: 'moviesInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      requestMovies.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      });
    builder.addCase(
      requestMovies.fulfilled, (state, { payload }) => {
        state.movies = payload;
        state.isLoading = true;
        state.isError = false;
      });
    builder.addCase(
      requestMovies.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  }
})

export default movieSlice.reducer;
