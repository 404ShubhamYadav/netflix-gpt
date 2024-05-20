import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name:"movies",
    initialState: {
        nowPlayingMovies: null,
        nowPlayingTrailer: null,
        popularMovies:null,
    },
    reducers: {
        addNowPlayingMovies:(state, action)=>{
            state.nowPlayingMovies = action.payload;
        },
        addNowPlayingVideos:(state, action)=>{
            state.nowPlayingTrailer = action.payload;
        },
        addPopularMovies:(state, action)=>{
            state.popularMovies = action.payload;
        },
    },
});

export const {addNowPlayingMovies, addNowPlayingVideos,addPopularMovies}= movieSlice.actions;
export default movieSlice.reducer;