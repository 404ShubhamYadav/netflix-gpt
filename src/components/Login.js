import React, { useRef, useState } from 'react'
import Header from './Header';
import { checkValidData } from '../utils/validate';
import apiClient from '../utils/apiClient';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BG_URL } from '../utils/constant';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignForm, setIsSignForm] = useState(true);
  const [errMessage, setErrMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = async () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrMessage(message);

    if (message) return;

    try {
      if (!isSignForm) {
        // Sign-Up
        const res = await apiClient.post("/auth/register", {
          name: name.current.value,
          email: email.current.value,
          password: password.current.value,
        });
        localStorage.setItem("token", res.data.token);
        dispatch(addUser(res.data.user));
        navigate("/browser");
      } else {
        // Sign-In
        const res = await apiClient.post("/auth/login", {
          email: email.current.value,
          password: password.current.value,
        });
        localStorage.setItem("token", res.data.token);
        dispatch(addUser(res.data.user));
        navigate("/browser");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong. Please try again.";
      setErrMessage(message);
    }
  }

  const toggleSignInForm = () => {
    setIsSignForm(!isSignForm);
  }

  return (
    <div>
      <Header />
      <div className='absolute'>
        <img className='h-screen object-cover w-screen' src={BG_URL} alt='bg'/>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='w-full md:w-3/12 absolute bg-black p-12 my-10 mx-auto right-0 left-0 text-white rounded-lg opacity-80'>
        <h1 className='font-bold text-3xl py-4'>{isSignForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignForm && (
          <input
            ref={name}
            className='p-2 my-2 w-full bg-gray-700'
            type="text" placeholder='Full Name'
          />)}
        <input
          ref={email}
          className='p-2 my-2 w-full bg-gray-700'
          type="text" placeholder='Email Address' />
        <input
          ref={password}
          className='p-2 my-2 w-full bg-gray-700'
          type="password" placeholder='Password' />
        <p className='text-red-500 font-bold text-lg py-2'>{errMessage}</p>
        <button
          onClick={handleButtonClick}
          className='p-2 my-4 bg-red-700 w-full rounded-lg'>
          {isSignForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className='py-4 cursor-pointer'
          onClick={toggleSignInForm}>{isSignForm ? "New to Netfix? Sign Up Now" : "Already Registered? Sign In Now"}
        </p>
      </form>
    </div>
  )
}

export default Login;