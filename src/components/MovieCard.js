import React from 'react'
import { useDispatch } from 'react-redux';
import { setSelectedMovie } from '../utils/movieSlice';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();

  return (
    <div className='w-48 cursor-pointer' onClick={() => dispatch(setSelectedMovie(movie))}>
      <img src={movie.posterUrl} alt="MovieCard" />
    </div>
  )
}

export default MovieCard;
