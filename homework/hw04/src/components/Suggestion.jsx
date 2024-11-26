import React from "react";

// display one suggestion
export default function Suggestion({ suggdata }) {
    
    return (

        <section className="flex justify-between items-center mb-4 gap-2">
        <img src={suggdata.thumb_url} alt="suggestion pictures" className="rounded-full" />
        <div className="w-[180px]">
            <p className="font-bold text-sm">{suggdata.username}</p>
            <p className="text-gray-600 text-xs">suggested for you</p>
        </div>
        <button aria-label="follow button" className="text-blue-600 text-sm py-2">follow</button>
    </section>

    );
}
