import React from 'react'
import Header from './Header';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryCon from './SecondaryCon';
import usePopularMovies from '../hooks/usePopularMovies';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useNowPlayingMovies();
  usePopularMovies();

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryCon />
        </>
      )}

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
