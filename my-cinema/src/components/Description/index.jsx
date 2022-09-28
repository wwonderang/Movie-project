import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import Loader from "../Loader";
import Button from "../Button";
import MovieTimetable from "../Timetable";

import './description.scss';

import cls from 'classnames';

const Description = () => {

  const [ movieDetails, setmovieDetails ] = useState([]);

  const { eventId } = useParams();

  const [ isLoading, setIsLoading ] = useState(false);

  const fetchMovieInfo = useCallback(async () => {
    setIsLoading(true);
    
    const data = await fetch(
      `https://soft.silverscreen.by:8443/wssite/webapi/event/data?filter=%7B%22event%22:%22
${eventId}%22,%22city%22:%221%22%7D&extended=true`
      );
    const movieDetails = await data.json();
    setmovieDetails(movieDetails);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieInfo([])
  }, []);

  return (
    
    <div className="filmDescription">
      {isLoading
      ? <Loader />
    :
    (<>
      {movieDetails.map((m) =>
      <div key={m.eventId}>
        <img className='movie-img' src={m.posterLink} alt="movie" />
        <div className='movie-name'>{m.name}</div>
        <div className="movie-annotation">{m.annotation}</div>
        <MovieTimetable showInfo={m}/>
        </div>
        )} 
        <Button />
    </>
  )
}
</div>
  )}

export default Description;
