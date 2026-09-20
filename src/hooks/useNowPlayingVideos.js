import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingVideos } from "../utils/movieSlice";
import apiClient from "../utils/apiClient";

const useNowPlayingVideos = (movieId) => {
  const dispatch = useDispatch();

  const trailerVideo = useSelector(
    (store) => store.movies.nowPlayingTrailer
  );

  const getMovieVideos = async () => {
    const res = await apiClient.get(`/movies/${movieId}/trailer`);
    dispatch(addNowPlayingVideos({ key: res.data.trailerKey }));
  };

  useEffect(() => {
    if (movieId) getMovieVideos();
  }, [movieId]);
};

export default useNowPlayingVideos;