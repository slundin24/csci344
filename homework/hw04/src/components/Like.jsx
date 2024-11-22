import React,{useState} from "react";
import { postDataToServer , deleteDataFromServer} from "../server-requests";

export default function Like({token, likeId, postId}){

const [stateLikeId, setStateLikeId] = useState(likeId);


async function createLike(){

const sendData = {
post_id: postId,
}
const responseData = await postDataToServer(
    token,
    "/api/likes/",
    sendData
);
console.log(responseData);
setStateLikeId(responseData.id);
}



async function deleteLike(){

const responseData = await deleteDataFromServer(
    token,
    "/api/likes/" + stateLikeId
);
console.log(responseData);
setStateLikeId(null);
}
    
    if(stateLikeId){

    return(
    <button 
    ariaLabel="Unlike This Post"
    ariaChecked="true"
    ariaRole="toggle"
    onClick={deleteLike}>
        <i className="fas text text-red-500 fa-heart"></i>
        </button>
);

    } else{
        return(
            <button
            
            ariaLabel="Like This Post"
            ariaChecked="false"
            ariaRole="toggle"
            onClick={createLike}>
            <i className="far fa-heart"></i>
            </button>
        );
    }
}



    // if(likeId){

    //     return(
    //     <button>
    //         <i className="fas text text-red-500 fa-heart"></i>
    //         </button>
    // );
    
    //     } else{
    //         return(
    //             <button>
    //             <i className="far fa-heart"></i>
    //             </button>
    //         );
    //     }
