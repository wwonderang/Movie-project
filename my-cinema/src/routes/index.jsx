import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import MovieList from '../components/MovieList';
import Header from '../components/Header';
import Description from '../components/Description';
import BasicModal from '../components/BasicModal';
import UserProfile from '../components/UserProfile';

const MovieRoutes = () => {

  return (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<MovieList/>} />
      <Route path='/MovieList/:eventId' element={<Description />} />
      <Route path='/user-profile' element={<UserProfile/>} />
    </Routes>
    <BasicModal />

  </BrowserRouter>
)};

export default MovieRoutes; 
 