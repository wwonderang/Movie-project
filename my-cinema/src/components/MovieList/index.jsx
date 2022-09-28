import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Movie from "../Movie";
import Loader from "../Loader";
import Scroll from "../Scroll";

import './movieList.scss';

import useDebounce from "../hooks/useDebounce";

import { requestMovies } from "../thunks/requestMovies";

import { getMoviesSelector, errorMoviesSelector, loadingMoviesSelector } from "../../store/selectors";

const MovieList = () => {

  const [searchQuery, setIsSearchQuery] = useState('');

  const [city, setCity] = useState(1);

  // const getAllMovies = useSelector(getMoviesSelector);

  const isLoading = useSelector(loadingMoviesSelector);
  const isError = useSelector(errorMoviesSelector);
  const movies = useSelector(getMoviesSelector);

  const dispatch = useDispatch();

  const handleCityChange = useCallback((e) => {
    setCity(e.target.value);
  }, []);

  const filteredMovies = movies?.filter((movie) => {
    return movie.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

  const totalMoviesAmount = useMemo(() => filteredMovies.length, [filteredMovies]);

  const getContent = useCallback(() => {
    if (!movies) {
      return <div>'Sorry, we've found no movies</div>
    } if(isError) {
      return <div>'Ooops, something went wrong</div>
    } if (isLoading) {
       return <Loader />
    } else {
      return filteredMovies.map((m) => 
        <Movie key={m.eventId} movie={m} />)
  }},[movies])

  const debouncedMovies = useDebounce(searchQuery, 250);

  const handleSearchMovie = useCallback((e) => {
    setIsSearchQuery(e.target.value);
  },[]);

  useEffect(() => {
    dispatch(requestMovies());
  }, [debouncedMovies]); 

  return (
    <div>
      <div className="total-movies-amount">Total movies: {totalMoviesAmount}</div>
      <input className="search-input" type="text" placeholder="Search" onChange={handleSearchMovie} />
      
        <div className="movie-list">
          <select className="city-name" value={city} onChange={handleCityChange}>
            <option value={1}>Minsk</option>
            <option value={5}>Grodno</option>
          </select>
          {getContent()}
          <Scroll />
      </div>
    </div>
  )
    }

export default MovieList;
