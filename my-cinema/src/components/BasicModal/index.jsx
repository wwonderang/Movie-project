import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@mui/material/Modal';

import './basicModal.scss';

import { signInUser, signUpUser } from '../../store/userSlice';
import { closeModal } from '../../store/modalSlice';
import { getUsers } from '../../store/selectors';

import SignInModal from '../SignInModal';
import SignUpModal from '../SignUpModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({onSubmit, handleChangeInput, handleSignIn}) {

  const dispatch = useDispatch();

  const isOpen = useSelector(state => state.modal.isOpen);

  const users = useSelector(getUsers);

  const [signInState, setSignInState] = useState({
    email: '',
    password: '',
  });

  const [formType, setIsFormType] = useState(true);

  const [isEmailExist, setIsEmailExist] = useState('');

  const handleSwitchToSignUp = (event) => {
    setIsFormType(false);
  }

  const checkIsEmailExist = () => {
    return users.find(i => i.email === signInState.email);
    }

  const handleSwitchToSignIn = (event) => {
    setIsFormType(true);
  }

  // const handleSignIn = useCallback((e) => {
  //   e.preventDefault();

  //   if(!checkIsEmailExist) {
  //     return setIsEmailExist('You need to sign up');
  //   } if (checkIsEmailExist.password !== signInState.password) {
  //     return setIsEmailExist('Passwords are incorrect')
  //   } 
  //   dispatch(signInUser(signInState));
  //   dispatch(closeModal());
  //   console.log(dispatch(signInUser(signInState)));
  // }, []);

  // const handleChangeInput = (e) => {
  //   setSignInState(
  //     {
  //         ...signInState,
  //       [e.target.name]: e.target.value
  //     })
  // };

  const handleCloseModal = () => {
    dispatch(closeModal());
  }

return (
  <div>
    <Modal
      open={isOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onSubmit={onSubmit}
    >
      {formType
        ?
        <SignInModal 
        handleSignIn={handleSignIn}
        handleChangeInput={handleChangeInput} 
        email={signInState.email} 
        password={signInState.password}
        isEmailExist={isEmailExist}
        handleSwitchToSignUp={handleSwitchToSignUp}
        handleCloseModal={handleCloseModal}
        />
        :
        <SignUpModal handleSwitchToSignIn={handleSwitchToSignIn} onSubmit={onSubmit} />
        
      }
   </Modal>
   </div>
 );
}
