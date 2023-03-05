import React from "react";
import { useParams } from "react-router-dom";

export default function Profile(props) {
    const {username} = useParams();

    // fetch to get all the posts.
    

    return(
        <div>
            tis {username}'s profile.
        </div>
    )
}