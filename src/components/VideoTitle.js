import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toggleMute } from '../utils/movieSlice';

const VideoTitle = ({ title, overview, genres, runtimeMinutes, userRating, year }) => {
    const dispatch = useDispatch();
    const [showInfo, setShowInfo] = useState(false);

    return (
        <div className='w-screen aspect-video pt-[15%] px-4 md:px-36 absolute z-10 text-white bg-gradient-to-r from-black'>
            <h1 className='text-2xl md:text-6xl font-bold'>{title}</h1>
            <p className='py-3 md:py-6 text-sm md:text-lg w-full md:w-1/3'>{overview}</p>
            <div className='flex flex-wrap gap-2'>
                <button
                    onClick={() => dispatch(toggleMute())}
                    className='bg-white text-black py-2 px-4 md:p-4 md:px-12 text-sm md:text-xl rounded-lg hover:bg-opacity-80'>
                    ▶️ Play
                </button>
                <button
                    onClick={() => setShowInfo(true)}
                    className='bg-gray-500 text-white py-2 px-4 md:p-4 md:px-12 text-sm md:text-xl bg-opacity-50 rounded-lg hover:bg-opacity-80'>
                    More Info
                </button>
            </div>

            {showInfo && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 px-4'
                     onClick={() => setShowInfo(false)}>
                    <div className='bg-gray-900 text-white w-full max-w-lg p-6 md:p-8 rounded-lg'
                         onClick={(e) => e.stopPropagation()}>
                        <h2 className='text-xl md:text-3xl font-bold mb-2'>{title}</h2>
                        <div className='flex gap-3 text-xs md:text-sm text-gray-400 mb-4'>
                            {year && <span>{year}</span>}
                            {runtimeMinutes && <span>{runtimeMinutes} min</span>}
                            {userRating && <span>⭐ {userRating.toFixed(1)}</span>}
                        </div>
                        {genres?.length > 0 && (
                            <p className='text-xs md:text-sm text-gray-400 mb-4'>{genres.join(' • ')}</p>
                        )}
                        <p className='text-sm md:text-lg'>{overview || "No overview available for this title."}</p>
                        <button
                            onClick={() => setShowInfo(false)}
                            className='mt-6 bg-white text-black px-6 py-2 rounded-lg'>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default VideoTitle;