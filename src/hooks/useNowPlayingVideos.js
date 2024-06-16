import { useEffect } from "react";
import { API_OPTION } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingVideos } from "../utils/movieSlice";

const useNowPlayingVideos = (movieId) => {

    const dispatch = useDispatch();

    const trailerVideo = useSelector(
        (store) => store.movies.nowPlayingTrailer
    );
    // fetch tailer video & updating the store with trailer video data
    const getMovieVideos = async () => {
        const data = await fetch(
            'https://api.themoviedb.org/3/movie/' +
            movieId +
            '/videos?language=en-US',
            API_OPTION);
        const json = await data.json();
        // console.log(json);
        const filterData = json.results.filter((video) => video.type === "Teaser");
        const tailer = filterData.length ? filterData[0] : json.results[0]
        // console.log(tailer);
        dispatch(addNowPlayingVideos(tailer));
    };

    useEffect(() => {
        !trailerVideo && getMovieVideos();
    }, []);

}

export default useNowPlayingVideos;

