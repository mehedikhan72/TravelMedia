import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import CreatePost from "./CreatePost";
import AuthContext from "../context/AuthContext";
import Likes from "./interactions/Likes";
import Comments from "./interactions/Comments";

export default function Profile(props) {
  const { username } = useParams(); // The one who's profile we are visiting.
  const [data, setData] = useState([]);
  const [fData, setFData] = useState({}); // fData denoting followers n following data
  const [dataChanged, setDataChanged] = useState(false);

  let { user } = useContext(AuthContext); // The logged in user.

  // fetch to get all the posts.
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/users/${username}/posts/`)
      .then(response => response.json())
      .then(json => {
        // figure out later why this happens multiple times.
        setData(json.results);
      })
  }, [])

  const newPostAdded = (newPost) => {
    const newData = [newPost, ...data]
    setData(newData);
  }

  // Follow/ Unfollow data
  const accessToken = JSON.parse(localStorage.getItem('authTokens')).access;

    useEffect(() => {
      fetch(`http://127.0.0.1:8000/api/users/${username}/f_data/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      })
        .then(response => response.json())
        .then(json => {
          setFData(json);
        })
    }, [dataChanged]);

  const handleFollow = () => {
    fetch(`http://127.0.0.1:8000/api/users/${username}/follow/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    })
      .then(response => response.json())
      .then(json => {
        setDataChanged(!dataChanged);
      })
  }

  const handleUnfollow = () => {
    fetch(`http://127.0.0.1:8000/api/users/${username}/unfollow/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    })
      .then(response => response.json())
      .then(json => {
        setDataChanged(!dataChanged);
      })
  }

  const [disableFeedView, setDisableFeedView] = useState(false);
  const createPostBtnClicked = () => {
    setDisableFeedView(true);
  }

  const createPostBtnCancelled = () => {
    setDisableFeedView(false);

  }

  const [postDetailViewOn, setPostDetailViewOn] = useState(false);
  const [detailViewPostID, setDetailViewPostId] = useState(null);

  const enableDetailView = (id) => {
    setPostDetailViewOn(true);
    setDetailViewPostId(id);
  }

  const disableDetailView = () => {
    setPostDetailViewOn(false);
    setDetailViewPostId(null);
  }

  return (
    <div>
      <h1>All the profiles info here. But will add later.</h1>
      <h3>Followers: {fData.followers_count}</h3>
      <h3>Followings: {fData.following_count}</h3>
      {fData.is_following === false && user.username !== username && <button onClick={handleFollow}>Follow</button>}
      {fData.is_following === true && user.username !== username && <button onClick={handleUnfollow}>Unfollow</button>}
      {user.username === username && <CreatePost
        newPostAdded={newPostAdded}
        createPostBtnClicked={createPostBtnClicked}
        createPostBtnCancelled={createPostBtnCancelled}
      />}

      <div className={disableFeedView ? "disabled" : ""}>
        {data.map((item) => (
          <div key={item.id} className={postDetailViewOn && detailViewPostID === item.id ? "each-post each-post-detailed-view" : "each-post"} id={item.id}>
            {postDetailViewOn && detailViewPostID === item.id &&
              <div className="post-detail-heading">
                <h6>Post detail</h6>
                <button className='my-btns' onClick={disableDetailView} type='submit'>X</button>
              </div>}
            <p className="post-title"><strong>{item.creator.username}</strong> is at <strong>{item.place}</strong></p>
            <p className="post-date">{item.trip_date}</p>

            <h6>{item.post}</h6>
            <br />
            <h4>Trip Info:</h4>
            <h6>We stayed at {item.place} for {item.trip_duration} days.</h6>
            <h6>We travelled as a group of {item.people_count}</h6>
            <h6>This tour cost each of us {item.cost_per_person} BDT.</h6>
            <h6>This is how we transported: {item.transportation_data}</h6>
            <h6>We stayed at {item.staying_place}</h6>
            <h6>{item.staying_place} cost each of us {item.staying_place_cost}</h6>
            <h6>We rate {item.staying_place} {item.staying_place_rating} out of 5.</h6>
            <h6>We had a {item.trip_rating} star rated trip in general</h6>
            <h6>Some of the important things to take if you wanna visit {item.place}: {item.important_things_to_take}</h6>
            <h6>Here are some of the cautions: {item.cautions}</h6>
            <br />

            <div className="interaction-menu">
              <Likes post_id={item.id} />
              {(!postDetailViewOn || item.id !== detailViewPostID) && <button onClick={() => enableDetailView(item.id)} className="my-btns"><i className="bx bx-comment"></i> Add Comments</button>}
              <button onClick={() => enableDetailView(item.id)} className="my-btns"><i className="bx bx-comment"></i> 4</button>
            </div>
            {postDetailViewOn && detailViewPostID === item.id &&
              <div>
                {/* <br /> */}
                <Comments post_id={item.id} />
              </div>
            }
          </div>
        ))}
      </div>
      
    </div>
  )
}