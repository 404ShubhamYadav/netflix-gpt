import React from "react";
import { useSelector } from "react-redux";
import lang from "./langConstant";

const GptSearchBar = ()=>{

    const langKey = useSelector((store)=>store.config.lang);
    return (
        <div className="pt-[30%] md:pt-[15%] flex justify-center">
            <form className="bg-black w-full md:w-1/2 grid grid-cols-12"
            onSubmit={(e)=>e.preventDefault()}>
                <input type="text"
                 className="p-4 m-4 col-span-9"
                  placeholder={lang[langKey].gptSearchPlaceholder} />
                <button className="py-2 px-4 m-4 bg-red-700 text-white col-span-3 rounded-lg">
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    )
}

export default GptSearchBar;