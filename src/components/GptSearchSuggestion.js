import React from 'react'
import { useSelector } from 'react-redux';

const GptSearchSuggestion = () => {
  const movieResults = useSelector((store) => store.gpt.movieResults);

  if (!movieResults) return null;

  return (
    <div className='max-w-2xl mx-auto px-6'>
      <h2 className='text-white text-xl mb-4'>
        Results for "{movieResults.query}"
      </h2>
      <ul className='flex flex-col gap-2'>
        {movieResults.titles?.map((title, index) => (
          <li
            key={index}
            className='bg-black bg-opacity-70 text-white px-5 py-3 rounded border border-gray-700'
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GptSearchSuggestion;