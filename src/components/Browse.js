import React from 'react'
import Header from './Header';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryCon from './SecondaryCon';
import usePopularMovies from '../hooks/usePopularMovies';

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();

  return (
    <div>
      <Header/>
      <MainContainer/>
      <SecondaryCon/>
      {/* 
          MainContainer
            -VideoTitle
            -VideoBackground
          Secondary Container
            -MoviesList*n
                cards*n
      */}
    </div>
  )
}

export default Browse;
