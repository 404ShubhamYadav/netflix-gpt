import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        nowPlayingTrailer: null,
        popularMovies: null,
        trendingMovies: null,
        topRatedMovies: null,
        upcomingMovies: null,
        selectedMovie: null,

        isTrailerMuted: true,
    },
    reducers: {
        addNowPlayingMovies: (state, action) => { state.nowPlayingMovies = action.payload; },
        addNowPlayingVideos: (state, action) => { state.nowPlayingTrailer = action.payload; },
        addPopularMovies: (state, action) => { state.popularMovies = action.payload; },
        addTrendingMovies: (state, action) => { state.trendingMovies = action.payload; },
        addTopRatedMovies: (state, action) => { state.topRatedMovies = action.payload; },
        addUpcomingMovies: (state, action) => { state.upcomingMovies = action.payload; },
        setSelectedMovie: (state, action) => { state.selectedMovie = action.payload; },

        toggleMute: (state) => { state.isTrailerMuted = !state.isTrailerMuted; },
    },
});

export const {
    addNowPlayingMovies, addNowPlayingVideos, addPopularMovies,
    addTrendingMovies, addTopRatedMovies, addUpcomingMovies, setSelectedMovie, toggleMute,
} = movieSlice.actions;
export default movieSlice.reducer;