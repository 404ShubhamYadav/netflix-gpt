import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptSearchSuggestion from './GptSearchSuggestion';
import { BG_URL } from '../utils/constant';

const GptSearch = () => {
  return (
    <>
      <div className='absolute -z-10'>
        <img className='h-screen object-cover w-screen' src={BG_URL} alt='bg' />
      </div>
      <div className='pt-[30%] md:p-0'>
        <GptSearchBar/>
        <GptSearchSuggestion/>
      </div>
    </>
  )
}
export default GptSearch;
