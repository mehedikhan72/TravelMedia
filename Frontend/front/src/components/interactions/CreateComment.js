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
                    console.log(comment);
                    props.newCommentAdded(data);
                    setComment("");
                })
                .catch(error => console.log(error));
        }
        else {
            console.log("Error Occured!");
        }
    }
    return (
        // BUG FOUND: INPUT BOX NOT CLEARING AFTER FORM SUBMISSION
        <div>
            <form onSubmit={handleSubmit} className="comment-form">
                <input required name="comment" placeholder="Your comment" onChange={(e) => setComment(e.target.value)} /> <br />
                <button className="my-btns" type="submit">Add</button>
            </form>
            <br />
        </div>
    )
}