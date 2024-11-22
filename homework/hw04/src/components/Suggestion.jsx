import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";

export default function Suggestion({ token }) {
    const [suggestion, setSuggestion] = useState(null);
    
    async function getSuggestion(){
        const data = await getDataFromServer(token, "/api/suggestions");
        
        setSuggestion(data);
    }

    useEffect(() => {
        getSuggestion();
    }, []);

    return (suggestion &&
        <header className="flex gap-4 items-center">
            <img src={suggestion.image_url} alt="Suggestion Picture" className="w-16 rounded-full" />
            <h2 className="font-Comfortaa font-bold text-2xl">{suggestion.user.username}</h2>
        </header>
    );
}
