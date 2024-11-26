import React, { useEffect, useState } from "react";
import { getDataFromServer } from "../server-requests";
import Story from "./Story";

export default function Stories({ token }) {

    const [stories, setStories] = useState([]);

    async function getStories(){
        const data = await getDataFromServer(token, "/api/stories");
        setStories(data);
    }

    useEffect(() => {
        getStories();
    }, []);

    function outputStories(storyObj){
        return <Story token={token} key={storyObj.id} storydata={storyObj} />
    }

    return (
        <header className="flex gap-6 bg-white border p-2 overflow-hidden mb-6">
            {stories.map(outputStories)}
        </header>
    );
}
