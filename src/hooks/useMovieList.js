import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import apiClient from "../utils/apiClient";

const useMovieList = (endpoint, actionCreator, selectorKey) => {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies[selectorKey]);

  useEffect(() => {
    if (!movies) {
      apiClient.get(endpoint).then((res) => {
        dispatch(actionCreator(res.data));
      });
    }
  }, []);
};

export default useMovieList;