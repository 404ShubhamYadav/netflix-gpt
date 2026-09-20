import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gptSearch",
    initialState: {
        showGptSearch: false,
        movieResults: null,
    },
    reducers: {
        toggleSearchView: (state, action) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addGptSearchResults: (state, action) => {
            state.movieResults = action.payload;
        },
    },
});

export const { toggleSearchView, addGptSearchResults } = gptSlice.actions;
export default gptSlice.reducer;