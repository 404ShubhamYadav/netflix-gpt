import React from 'react'
import Header from './Header';
import useMovieList from '../hooks/useMovieList';
import ChatBotWidget from './ChatBotWidget';
import useNowPlayingVideos from '../hooks/useNowPlayingVideos';
import MainContainer from './MainContainer';
import SecondaryCon from './SecondaryCon';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';
import {
  addNowPlayingMovies,
  addPopularMovies,
  addTrendingMovies,
  addTopRatedMovies,
  addUpcomingMovies,
} from '../utils/movieSlice';

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useMovieList("/movies/now-playing?limit=8", addNowPlayingMovies, "nowPlayingMovies");
  useMovieList("/movies/popular?limit=8", addPopularMovies, "popularMovies");
  useMovieList("/movies/trending?limit=8", addTrendingMovies, "trendingMovies");
  useMovieList("/movies/top-rated?limit=8", addTopRatedMovies, "topRatedMovies");
  useMovieList("/movies/upcoming?limit=8", addUpcomingMovies, "upcomingMovies");

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
      <ChatBotWidget />
    </div>
  )
}

export default Browse;