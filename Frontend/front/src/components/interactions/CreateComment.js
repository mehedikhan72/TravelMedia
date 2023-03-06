import React, { useState } from "react";  

export default function CreateComment(props) {
    const [comment, setComment] = useState("");
    const accessToken = JSON.parse(localStorage.getItem('authTokens')).access;
    const post_id = props.post_id;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (accessToken) {
            fetch(`http://127.0.0.1:8000/api/post/${post_id}/comments/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    comment_text: comment
                })
            })
                .then(response => response.json())
                .then(data => {
                    props.newCommentAdded(data);
                })
                .catch(error => console.log(error));
        }
        else {
            console.log("Error Occured!");
        }
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input required name="comment" placeholder="Add a comment" onChange={(e) => setComment(e.target.value)}/> <br />
                <input type="submit"/>
            </form>
        </div>
    )
}