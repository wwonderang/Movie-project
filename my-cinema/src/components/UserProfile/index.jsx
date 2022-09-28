import React, { useState, useEffect, useRef } from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import './userprofile.scss';

const UserProfile = ({password}) => {

  const [email, setIsEmail] = useState('');

  const [firstName, setIsFirstName] = useState('');

  const [lastName, setIsLastName] = useState('');

  const [phone, setIsPhone] = useState('');

  const [birthday, setIsBirthday] = useState('');

  const [city, setIsCity] = useState('');

  const [sex, setIsSex] = useState('');

  const [newPassword, setIsNewPassword] = useState('');

  const [repeatNewPassword, setIsRepeatNewPassword] = useState('');

  const [oldPassword, setIsOldPassword] = useState('');

  const isAuthorizedUser = localStorage.getItem('isUserAuthrized');
  const users = localStorage.getItem('users');
  const usersParse = JSON.parse(users);
  const user = usersParse.find((i) => isAuthorizedUser === i.email);

  const handleChangeInput = (type) => (e) => {
    switch (type) {
      case 'email':
        setIsEmail(e.target.value);
        break;
      case 'firstName':
        setIsFirstName(e.target.value);
        break;
      case 'lastName':
        setIsLastName(e.target.value);
        break;
      case 'phone':
        setIsPhone(e.target.value);
        break;
      case 'birthday':
        setIsBirthday(e.target.value);
        break;
      case 'city':
        setIsCity(e.target.value);
        break;
      case 'sex':
        setIsSex(e.target.value);
        break;
      case 'oldPassword':
        setIsOldPassword(e.target.value);
        break;
      case 'newPassword':
        setIsNewPassword(e.target.value);
        break;
      case 'repeatNewPassword':
        setIsRepeatNewPassword(e.target.value);
        break;
      default:
        console.log(type);
    }
  }

  const handleChangeSave = () => {
    const changeUserInfo = {
      email,
      firstName,
      lastName,
      phone,
      birthday,
      city, 
      sex, 
      oldPassword,
      newPassword, 
      repeatNewPassword,
    }

    const notAuthorizedUsers = usersParse.filter(i => email !== i.email);
    if ((oldPassword === user.password) && newPassword === repeatNewPassword) {
    localStorage.setItem('users', JSON.stringify([...notAuthorizedUsers, changeUserInfo]));
  }};

  const inputRef = useRef(null);
    useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Box className="user-profile"
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '220px' },
    }}
    noValidate
    autoComplete="off"
    >

    <TextField 
    value={email}
    ref={inputRef}
    onChange={handleChangeInput('email')}
    id="standard-basic" 
    label="Email" 
    variant="standard" />

    <TextField 
    value={firstName}
    onChange={handleChangeInput('firstName')}
    id="standard-basic" 
    label="First Name" 
    variant="standard" />

    <TextField 
    value={lastName}
    onChange={handleChangeInput('lastName')}
    id="standard-basic" 
    label="Last Name" 
    variant="standard" />

    <TextField 
    value={phone}
    onChange={handleChangeInput('phone')}
    id="standard-basic" 
    type='tel'
    label="Phone" 
    variant="standard" />

    <TextField 
    value={birthday}
    onChange={handleChangeInput('birthday')}
    id="standard-basic" 
    label="Birthday"
    type='date'
    variant="standard" />

    <TextField 
    value={city}
    onChange={handleChangeInput('city')}
    id="standard-basic" 
    label="City" 
    variant="standard" />

    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sex</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sex}
          label="Sex"
          onChange={handleChangeInput('sex')}
        >
          <MenuItem value={1}>Male</MenuItem>
          <MenuItem value={2}>Female</MenuItem>
        </Select>
      </FormControl>
    </Box>

    <TextField 
    value={oldPassword}
    onChange={handleChangeInput('oldPassword')}
    type='password'
    id="standard-basic" 
    label="Old password" 
    variant="standard" />

    <TextField 
    value={newPassword}
    onChange={handleChangeInput('newPassword')}
    type='password'
    id="standard-basic" 
    label="New password" 
    variant="standard" />

    <TextField 
    value={repeatNewPassword}
    onChange={handleChangeInput('repeatNewPassword')}
    type='password'
    id="standard-basic" 
    label="Repeat new password" 
    variant="standard" />

    <Button 
      onClick={handleChangeSave} 
      href="#text-buttons">Save </Button>
  </Box>
  )
}

export default UserProfile;
