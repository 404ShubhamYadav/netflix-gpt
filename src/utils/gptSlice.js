import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gptSearch",
    initialState: {
        showGptSearch: false,
    },
    reducers: {
        toggleSearchView: (state, action)=>{
            state.showGptSearch = !state.showGptSearch;
        },
    },
});

export const {toggleSearchView}= gptSlice.actions;
export default gptSlice.reducer;