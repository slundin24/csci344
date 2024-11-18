import React from "react";

export default function Bookmark({bookmarkId}){


    
    if(bookmarkId){

    return(
    <button>
        <i className="fas fa-bookmark"></i>
        </button>
);

    } else{
        return(
            <button>
            <i className="far fa-bookmark"></i>
            </button>
        );
    }
}