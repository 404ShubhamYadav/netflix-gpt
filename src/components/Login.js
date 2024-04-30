import React, { useState } from 'react'
import Header from './Header';

const Login = () => {
  const[isSignForm, setIsSignForm] = useState(true);

  const toggleSignInForm = ()=>{
    setIsSignForm(!isSignForm);
  }

  return (
    <div>
      <Header/>
      <div className='absolute'>
        <img src='https://assets.nflxext.com/ffe/siteui/vlv3/c7f07b68-7989-4ff7-a31e-11c17dcc2fea/fcf685b8-3f9f-42d8-9af3-4bb86fa5a3b8/IN-en-20240422-popsignuptwoweeks-perspective_alpha_website_large.jpg'alt='bg'/>
      </div>
      <form  className='w-3/12 absolute bg-black p-12 my-32 mx-auto right-0 left-0 text-white rounded-lg opacity-80'>
        <h1 className='font-bold text-3xl py-4'>{isSignForm ? "Sign In": "Sign Up"}</h1>
        { !isSignForm && (
        <input
         className='p-2 my-2 w-full bg-gray-700' type="text" placeholder='Full Name' 
         />)}
        <input className='p-2 my-2 w-full bg-gray-700' type="text" placeholder='Email Address'/>
        <input className='p-2 my-2 w-full bg-gray-700' type="password" placeholder='Password'/>
        <button className='p-2 my-4 bg-red-700 w-full rounded-lg'>{isSignForm ? "Sign In": "Sign Up"}</button>
        <p className='py-4 cursor-pointer'onClick={toggleSignInForm}>{isSignForm ? "New to Netfix? Sign Up Now": "Already Registered? Sign In Now"}</p>
      </form>
    </div>
  )
}

export default Login;
