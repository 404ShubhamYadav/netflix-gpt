import React, { useEffect } from 'react'
import apiClient from '../utils/apiClient';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, Supported_Languages } from '../utils/constant';
import { toggleSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(removeUser());
      return;
    }

    apiClient.get("/users/me")
      .then((res) => {
        dispatch(addUser(res.data));
        navigate("/browser");
      })
      .catch(() => {
        localStorage.removeItem("token");
        dispatch(removeUser());
        navigate("/");
      });
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch(removeUser());
    navigate("/");
  }

  const handleGptSearchClick = () => {
    dispatch(toggleSearchView());
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className='absolute w-screen px-6 py-2 bg-gradient-to-b from-black z-50 flex flex-col md:flex-row justify-between'>
      <img className='w-44 mx-auto md:mx-0' src={LOGO} alt='logo' />
      {user && (
        <div className='flex p-2'>

          {showGptSearch && (
            <select className='m-2 p-2 bg-gray-900 text-white' onChange={handleLanguageChange}>
              {Supported_Languages.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
              ))}
            </select>
          )}

          <button className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg'
            onClick={handleGptSearchClick}>
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <span className='text-white font-bold self-center mx-2'>{user?.name}</span>
          <button onClick={handleSignOut} className='font-bold text-white'>(Sign Out)</button>
        </div>
      )}
    </div>
  )
}

export default Header;