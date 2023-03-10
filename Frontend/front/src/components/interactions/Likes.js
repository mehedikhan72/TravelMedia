import React, { useState, useEffect } from "react";

export default function Likes(props) {
  const post_id = props.post_id;

  const [likeStatus, setLikeStatus] = useState("not-interacted");
  const [likeCount, setLikeCount] = useState(0);

  const accessToken = JSON.parse(localStorage.getItem('authTokens')).access;

  // get status
  const getStatus = () => {
    fetch(`http://127.0.0.1:8000/api/post/${post_id}/like_status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    })
      .then(response => response.json())
      .then(json => {
        setLikeStatus(json.status);
        setLikeCount(json.likes_count);
      })
  }

  getStatus();

  const increaseLikes = () => {
    if (accessToken) {
      fetch(`http://127.0.0.1:8000/api/post/${post_id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(post_id)
      })
        .then(response => response.json())
        .then(data => {
          getStatus();
        })
        .catch(error => console.log(error));
    }
  }

  const decreaseLikes = () => {
    if (accessToken) {
      fetch(`http://127.0.0.1:8000/api/post/${post_id}/unlike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(post_id)
      })
        .then(response => response.json())
        .then(data => {
          getStatus();
        })
        .catch(error => console.log(error));
    }
  }

  // BUG: not a bug but..the like buttons move back n forth when like count changes. it looks bad. needa fix it.

  return (
    <div className="like-info">
      <button className="upvote" onClick={increaseLikes}><i className={likeStatus === 'liked' ? 'bx bxs-upvote' : 'bx bx-upvote'}></i></button>
      <p className="like-count">{likeCount}</p>
      <button className="downvote" onClick={decreaseLikes}><i className={likeStatus === 'disliked' ? 'bx bxs-downvote' : 'bx bx-downvote'} ></i></button>
    </div>
  )
}