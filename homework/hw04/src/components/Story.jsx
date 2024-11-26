import React from "react";

export default function Story({ storydata }) {
    const { user } = storydata;

    return (

        <div className="flex flex-col justify-center items-center">
                <img src={storydata.user.thumb_url} alt="story pictures" className="rounded-full border-4 border-gray-300" />
                <p className="text-xs text-gray-500">{storydata.user.username}</p>
            </div>
    );
    
}