import React from 'react';
import { Form } from 'react-final-form';
import { closeModal } from '../../store/modalSlice';
import { useDispatch } from 'react-redux';

const SignInAlert = () => {

  const dispatch = useDispatch();
  const onSubmit = () => {
    dispatch(closeModal());
  }

  return (
    <Form onSubmit={onSubmit}
        render={({ onSubmit }) => (
      <form >
        You've successfully signed in!
      <button onClick={onSubmit} type="button">Ok</button>
    </form>
    
  )}
  />
  )}

export default SignInAlert;
