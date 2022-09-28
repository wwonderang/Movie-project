import { configureStore } from "@reduxjs/toolkit";

import userReducer from './userSlice';

import modalReducer from "./modalSlice";

import movieReducer from "./movieSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    moviesInfo: movieReducer,
  }
})
