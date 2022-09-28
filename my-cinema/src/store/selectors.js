import { createSelector } from "reselect";

export const getUserSelector = (state) => {
  return state.user;
};

export const getUsersSelector = (state) => {
  return state.users;
};

export const getUser = createSelector(getUserSelector, (user) => {
  return user.user;
});

export const getUsers = createSelector(getUserSelector, (users) => {
  return users.users;
})

export const loadingMovies = (state) => {
  return state.isLoading;
}

export const loadingMoviesSelector = createSelector(loadingMovies, (isLoading) => {
  return isLoading;
}) 

export const errorMovies = (state) => {
  return state.isError;
}

export const errorMoviesSelector = createSelector(errorMovies, (isError) => {
  return isError;
})

export const getMovies = (state) => {
  return state.moviesInfo;
}

export const getMoviesSelector = createSelector(getMovies, (moviesInfo) => {
  return moviesInfo.movies;
})

// export const getMoviesSelector = createSelector(getMovies, (movies) => {
//   movies.filter((movie) => movie.name.toLowerCase().includes(movies.toLowerCase()));
// })
