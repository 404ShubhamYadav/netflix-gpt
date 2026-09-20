import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "./langConstant";
import apiClient from "../utils/apiClient";
import { addGptSearchResults } from "../utils/gptSlice";

const GptSearchBar = () => {
    const dispatch = useDispatch();
    const searchText = useRef(null);
    const langKey = useSelector((store) => store.config.lang);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleGptSearchClick = async () => {
        const query = searchText.current.value;
        if (!query) return;

        setIsLoading(true);
        setErrorMessage(null);

        try {
            const res = await apiClient.post("/ai/search", { query });
            dispatch(addGptSearchResults(res.data));
        } catch (error) {
            setErrorMessage("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="pt-[30%] md:pt-[15%] flex justify-center flex-col items-center">
            <form className="bg-black w-full md:w-1/2 grid grid-cols-12"
                onSubmit={(e) => e.preventDefault()}>
                <input
                    ref={searchText}
                    type="text"
                    className="p-4 m-4 col-span-9"
                    placeholder={lang[langKey].gptSearchPlaceholder} />
                <button
                    onClick={handleGptSearchClick}
                    disabled={isLoading}
                    className="py-2 px-4 m-4 bg-red-700 text-white col-span-3 rounded-lg disabled:opacity-50">
                    {isLoading ? "Searching..." : lang[langKey].search}
                </button>
            </form>
            {errorMessage && (
                <p className="text-red-500 font-bold">{errorMessage}</p>
            )}
        </div>
    );
};

export default GptSearchBar;