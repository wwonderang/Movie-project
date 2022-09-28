import React, { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux/es/exports";

import { useNavigate } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import logo from './../../img/cinema-icon.jpg';
import './header.scss';

import { openModal } from "../../store/modalSlice";
import { signOutUser } from "../../store/userSlice";

import { getUser } from "../../store/selectors";

const Header = () => {

  const dispatch = useDispatch();

  const user = useSelector(getUser);
  console.log(useSelector(getUser));

  const handleOpenModal = () => {
    dispatch(openModal());
  }

  const [isAuthorized, setIsAuthorized] = useState('');

  window.addEventListener('storage', (e) => {
    setIsAuthorized(e.value);
  })

  const handleSignOut = useCallback((event) => {
    dispatch(signOutUser());
  }, [])

  const navigate = useNavigate();
  const goToProfilePage = () => {
    navigate('../user-profile');
  }

  const handleGetUserName = () => {
    return (
      <span className="greeting">Hello, {user.firstName}</span>
  )
}

  return (
    <div className="cinema-header">

      <img src={ logo } alt="logo" />

      {isAuthorized
        ? 
        <div>
          <AccountCircleIcon onClick={goToProfilePage} className="user-icon"/>
            {handleGetUserName()} 
            <button onClick={handleSignOut}>Sign Out</button></div>
            : 
              <button onClick={handleOpenModal}>Sign in</button>
      }


    </div>
  );
};

export default Header;
