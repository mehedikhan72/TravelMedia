import React, { useState, useEffect } from "react";
import CreateComment from "./CreateComment";

export default function Comments(props) {
    const [comments, setComments] = useState([]);
    const post_id = props.post_id;

    const accessToken = JSON.parse(localStorage.getItem('authTokens')).access;

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/post/${post_id}/comments/`)
            .then(response => response.json())
            .then(json => {
                console.log(json.results);
                setComments(json.results);
            })
    }, [])

    const newCommentAdded = (newComment) => {
        const newComments = [newComment, ...comments]
        setComments(newComments);
    }

    const postDetails = false;

    return (
        <div>
             <CreateComment post_id={post_id} newCommentAdded={newCommentAdded}/>
            {comments.map((item) => (
                <div key={item.id} className="text">
                    <h6>{item.comment_text}</h6>
                    <h6>Commented by: {item.creator}</h6>
                </div>
            ))
            }
        </div>
    )
}