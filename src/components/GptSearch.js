import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptSearchSuggestion from './GptSearchSuggestion';
import { BG_URL } from '../utils/constant';

const GptSearch = () => {
  return (
    <div className='relative min-h-screen'>
      <div className='fixed inset-0 -z-10'>
        <img className='h-full w-full object-cover' src={BG_URL} alt='bg' />
        <div className='absolute inset-0 bg-black bg-opacity-60' />
      </div>
      <div className='pb-20'>
        <GptSearchBar />
        <GptSearchSuggestion />
      </div>
    </div>
  )
}
export default GptSearch;