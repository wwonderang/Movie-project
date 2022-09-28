import React, { useState, useCallback, useRef, useEffect } from "react";

import { Form, Field } from 'react-final-form';

import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import { signInUser } from "../../store/userSlice";

import { getUsers } from '../../store/selectors';

import { useSelector, useDispatch } from "react-redux";

import { closeModal } from "../../store/modalSlice";

import Styles from './Styles';

import SignInAlert from "../AlertMessage/SignInAlert";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const SignInModal = React.forwardRef((props, ref) => {

  const {email, password, handleSwitchToSignUp } = props;

  const [passwordShown, setPasswordShown] = useState(false);

  const [isOpen, setIsOpen] = useState(true);

  const [isSignIn, setIsSignIn] = useState(false);

  const [signInState, setSignInState] = useState({
    email: '',
    password: '',
  });

  const users = useSelector(getUsers);

  const dispatch = useDispatch();

  const handleCloseModal = useCallback(() => {
    dispatch(closeModal());
  });

  const handleShowPassword = useCallback(() => {
    setPasswordShown(!passwordShown);
  }, [passwordShown]);

  const handleSignIn = useCallback((e) => {
    e.preventDefault();
    dispatch(signInUser(signInState));
    handleCloseModal();
    setIsSignIn(true);
  }, []);

  const handleChangeInput = (e) => {
    setSignInState(
      {
          ...signInState,
        [e.target.name]: e.target.value
      }, [signInState])
  };

  const inputRef = useRef(null);
    useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Styles>
    <Form
      open={isOpen}
      onClose={handleCloseModal}
      onSubmit={handleSignIn}
      handleChangeInput={handleChangeInput}
      handleSignIn={handleSignIn}
      validate={values => {
        
        const errors = {}
        if (!values.email) {
          errors.email = 'Required'
        }
        if (!values.password) {
          errors.password = 'Required'
        } 

        return errors
      }}

      render={({ form, submitting, pristine, values, email, password, handleCloseModal, handleChangeInput }) => (
        <form onSubmit={handleSignIn}>
          <h2>Sign In</h2>

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

          <div className="buttons">
            <button onClick={handleSignIn} type="submit" disabled={submitting}>
              Submit 
            </button>
            <button
              type="button"
              onClick={form.reset}
              disabled={!email || !password}
            >
              Reset
            </button>
            <div className="create-acc-notification">
              Don't you have an account? 
            </div>
          </div>

          <Button className="create-acc-btn" 
          onClick={handleSwitchToSignUp}>Create one</Button> 
        </form>
      )}
    />
    {isSignIn ? <SignInAlert /> : null}
    </Styles>
)
})

export default SignInModal;
