import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTION } from "../utils/constant";

const usePopularMovies = ()=>{
    // Fetch the data from TMDB movies and update the store
  const dispatch = useDispatch();
  const getPopularMovies = async ()=>{
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/popular?page=1',
      API_OPTION
    );
    const jason = await data.json();
    // console.log(jason);
    dispatch(addPopularMovies(jason.results));
  };

  useEffect(()=>{
    getPopularMovies();
  }, [])
}

export default usePopularMovies;