import React from "react";

export default function Posts(){
    fetch(`http://127.0.0.1:8000/api/posts/`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    return (
        <div>
            <h2>This is where the posts will be in.</h2>
        </div>
    )
}