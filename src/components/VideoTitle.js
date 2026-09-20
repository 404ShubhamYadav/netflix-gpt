import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toggleMute } from '../utils/movieSlice';

const VideoTitle = ({ title, overview,year, runtimeMinutes, userRating, genres }) => {
    const dispatch = useDispatch();
    const [showInfo, setShowInfo] = useState(false);

    return (
        <div className='w-screen aspect-video pt-[15%] px-36 absolute z-10 text-white bg-gradient-to-r from-black'>
            <h1 className='text-6xl font-bold'>{title}</h1>
            <p className='py-6 text-lg w-1/3'>{overview}</p>
            <div>
                <button
                    onClick={() => dispatch(toggleMute())}
                    className='bg-white text-black p-4 px-12 text-xl rounded-lg hover:bg-opacity-80'>
                    ▶️ Play
                </button>
                <button
                    onClick={() => setShowInfo(true)}
                    className='bg-gray-500 mx-2 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg hover:bg-opacity-80'>
                    More Info
                </button>
            </div>

            {showInfo && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80'
                    onClick={() => setShowInfo(false)}>
                    <div className='bg-gray-900 text-white max-w-lg p-8 rounded-lg'
                        onClick={(e) => e.stopPropagation()}>
                        <h2 className='text-3xl font-bold mb-2'>{title}</h2>
                        <div className='flex gap-3 text-sm text-gray-400 mb-4'>
                            {year && <span>{year}</span>}
                            {runtimeMinutes && <span>{runtimeMinutes} min</span>}
                            {userRating && <span>⭐ {userRating.toFixed(1)}</span>}
                        </div>
                        {genres?.length > 0 && (
                            <p className='text-sm text-gray-400 mb-4'>{genres.join(' • ')}</p>
                        )}
                        <p className='text-lg'>{overview || "No overview available for this title."}</p>
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
