import React, { useState, useCallback, useEffect, useRef } from "react";
import Button from '@mui/material/Button';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Styles from './../SignInModal/Styles';
import { Form, Field } from 'react-final-form';

import { useDispatch } from "react-redux/es/exports";

import { signUpUser } from "../../store/userSlice";
import { closeModal } from '../../store/modalSlice';

import SignUpAlert from "../AlertMessage/SignUpAlert";

const SignUpModal = React.forwardRef((props, ref) => {

  const {firstName, lastName, phone, password,
    repeatPassword, isOpen, handleSwitchToSignIn} = props;

  const [isSignUp, setIsSignUp] = useState(false);

  const [passwordShown, setPasswordShown] = useState(false);

  const [signUpState, setSignUpState] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    repeatPassword: '',
  });

  const handleShowPassword = () => {
    setPasswordShown(!passwordShown);
  }

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  }

  const handleSignUp = useCallback((e) => {
    e.preventDefault();
    const checkEmail = /\S+@\S+\.\S+/;
    const userEmail = checkEmail.test(signUpState.email);
    if(!userEmail || (signUpState.password !== signUpState.repeatPassword)) {
      alert('Please, check your data. You have mistakes');
    } else {
    dispatch(signUpUser((signUpState)))
    setIsSignUp(true);
    dispatch(closeModal());
    }
  });


  const handleChangeInput = useCallback((e) => {
    setSignUpState({
      ...signUpState,
    [e.target.name]: e.target.value})
  }, [signUpState]);

  const inputRef = useRef(null);
    useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Styles>
    <Form
      open={isOpen}
      onClose={handleCloseModal}  
      onSubmit={handleSignUp}
      handleChangeInput={handleChangeInput}
      handleSignUp={handleSignUp}
      validate={values => {
        
        const errors = {}
        if (!values.email) {
          errors.email = 'Required'
        }
        if (!values.password) {
          errors.password = 'Required'
        } if (!values.firstName) {
          errors.firstName = 'Required'
        } if (!values.lastName) {
          errors.lastName = 'Required'
        } if (!values.phone) {
          errors.phone = 'Required'
        } if (!values.repeatPassword) {
          errors.phone = 'Required'
        } if (values.password !== values.repeatPassword) {
          errors.passwordsMatch = 'Passwords are not equal';
        }

        return errors
      }}
      

      render={({ handleSignIn, form, submitting, pristine, values, email, password, handleChangeInput, onSubmit }) => (
        <form onSubmit={handleSignIn}>
          <h2>Sign Up</h2>

          <Field name="email">
            {({ input, meta }) => (
              <div>
                <label>Email</label>
                <input ref={inputRef} {...input} type="text" value={email}
                onChange={handleChangeInput} placeholder="Email" />
                {meta.error && meta.touched && <span>{meta.error}</span>}

              </div>
            )}
          </Field>

          <Field name="firstName">
            {({ input, meta }) => (
              <div>
                <label>First name</label>
                <input {...input} type="text" value={firstName}
                onChange={handleChangeInput} placeholder="First Name" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>

          <Field name="lastName">
            {({ input, meta }) => (
              <div>
                <label>Last name</label>
                <input {...input} type="text" value={lastName}
                onChange={handleChangeInput} placeholder="Last Name" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>

          <Field name="phone">
            {({ input, meta }) => (
              <div>
                <label>phone</label>
                <input {...input} type="text" value={phone}
                onChange={handleChangeInput} placeholder="Phone" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>

          <Field name="password">
            {({ input, meta }) => (
              <div>
                <label>Password</label>
                <input {...input} type={passwordShown ? "text" : "password"}
                value={password} onChange={handleChangeInput} placeholder="Password" />
                {meta.error && meta.touched && <span>{meta.error}</span> }
                <RemoveRedEyeIcon className='showPswSgnIn' onClick={handleShowPassword}/>
              </div>
            )}
          </Field>

          <Field name="repeatPassword">
            {({ input, meta }) => (
              <div>
                <label>Repeat password</label>
                <input {...input} type={passwordShown ? "text" : "password"}
                value={repeatPassword} onChange={handleChangeInput} placeholder="Repeat Password" />
                {meta.error && meta.touched && <span>{meta.error}</span> }
                <RemoveRedEyeIcon className='showPswSgnIn' onClick={handleShowPassword}/>
              </div>
            )}
          </Field>
          

          <div className="buttons">
            <button onClick={handleSignUp} type="submit" disabled={submitting}>
              Submit
            </button>
            <button
              type="button"
              onClick={form.reset}
              // disabled={submitting || pristine}
            >
              Reset
            </button>
          </div>
          <div>
          </div>
          <Button 
          onClick={handleSwitchToSignIn} 
          href="#text-buttons">Go to sign in</Button>
        </form>
       
        
      )}
    />
    {isSignUp ? <SignUpAlert/> : null}
    </Styles>
  )
})
  export default SignUpModal;
