import React, { useRef, useState } from 'react'
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL, User_AVATAR } from '../utils/constant';

const Login = () => {
  const dispatch = useDispatch();
  const [isSignForm, setIsSignForm] = useState(true);
  const [errMessage, setErrMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // Either we can use state variables or useRef hook for checking valid email and password
    // you have reference to input box if you want to check what is there in the I/P box
    // console.log(email.current.value);
    // console.log(password.current.value);
    const message = checkValidData(email.current.value, password.current.value);
    setErrMessage(message);

    if (message) return;

    if (!isSignForm) {
      // Sign-Up logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: User_AVATAR,
          })
            .then(() => {
              // We want all below detals from updated users thats why we are fetching from auth.currentUser not from user
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL
                }))

            }).catch((error) => {
              setErrMessage(error.message);
            });
        })

        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
        });
      //  Sign- logic
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
        });
    }
  }
  const toggleSignInForm = () => {
    setIsSignForm(!isSignForm);
  }

  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src={BG_URL} alt='bg'/>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='w-3/12 absolute bg-black p-12 my-32 mx-auto right-0 left-0 text-white rounded-lg opacity-80'>
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
