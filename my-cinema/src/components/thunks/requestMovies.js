import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const requestMovies = createAsyncThunk('movies/requestMovies', async() => {
  const response = await axios.get(
    `https://soft.silverscreen.by:8443/wssite/webapi/event/data?filter=%7B%22city%22:1%7D&extended=true`
  );

  return response.data;
});
