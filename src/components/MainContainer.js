import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
    const popularMovies = useSelector((store) => store.movies?.popularMovies);
    const selectedMovie = useSelector((store) => store.movies?.selectedMovie);

    if (!popularMovies) return;

    const NowPlaying = selectedMovie || popularMovies[2];

    const { title, overview, id, genres, runtimeMinutes, userRating, year } = NowPlaying;

    return (
        <div className=" pt-[35%] md:pt-0">
            <VideoTitle
                title={title}
                overview={overview || "No overview available."}
                genres={genres}
                runtimeMinutes={runtimeMinutes}
                userRating={userRating}
                year={year}
            />
            <VideoBackground movieId={id} />
        </div>
    )
}

export default MainContainer;