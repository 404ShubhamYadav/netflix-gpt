import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTION } from "../utils/constant";

const useNowPlayingMovies = ()=>{
    // Fetch the data from TMDB movies and update the store
  const dispatch = useDispatch();
  const getNowPlayingMovies = async ()=>{
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/now_playing?page=1',
      API_OPTION
    );
    const jason = await data.json();
    // console.log(jason);
    dispatch(addNowPlayingMovies(jason.results));
  };

  useEffect(()=>{
    getNowPlayingMovies();
  }, [])
}

export default useNowPlayingMovies;