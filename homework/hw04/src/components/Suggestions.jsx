import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";
import Suggestion from "./Suggestion.jsx";

// Fetch the suggestions data from the server and use the map function to display each suggestion
export default function Suggestions({ token }) {
    const [suggestions, setSuggestions] = useState([]);

    async function getSuggestions(){
        console.log(token);
        const data = await getDataFromServer(token, "/api/suggestions");
        console.log(data);
        setSuggestions(data);
    }

    useEffect(() => {
        getSuggestions();
    }, []);

    function outputSuggestion(suggestionObj){
        return <Suggestion key={suggestionObj.id} suggdata={suggestionObj}/>
    }
    return (
        <div className="mt-4">
            <p className="text-base text-gray-600 font-bold mb-4">
                Suggestions for you
            </p>
{
suggestions.map(outputSuggestion)
}
        </div>
    );
}
