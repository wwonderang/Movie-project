import React, { useState } from "react";

import { useNavigate } from 'react-router-dom';

import './movie.scss';

import BasicAlerts from "../BasicAlerts";

const Movie = (props) => {
  const { movie } = props;

  const { posterLink, name, ageLimit } = movie;

  const [isAlert, setIsAlert] = useState('');

  const isAuthorizedUser = localStorage.getItem('isUserAuthrized');

  const navigate = useNavigate();

  const handleBuyClick = (eventId) => () => {
    navigate(`/MovieList/${movie.eventId}`);
  }

  const notificationToSignIn = () => {
    setIsAlert(<BasicAlerts/>);
  }

  return (
    <div
      className='movie-wrapper'>
      <img className='movie-img' src={posterLink} alt="movie" />
      <div className='movie-name'>{name}</div>
      <div className='movie-age'>{ageLimit.acronym}</div>
      {isAuthorizedUser ?
        <button onClick={handleBuyClick(movie.eventId)}>Buy a ticket</button>
        :
        <button onClick={notificationToSignIn}>Buy a ticket</button>
      }{isAlert}
    </div>
  
  )
}

export default Movie;
