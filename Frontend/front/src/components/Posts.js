import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import CreatePost from "./CreatePost";
import Likes from "./interactions/Likes";
import Comments from "./interactions/Comments";
import CreateComment from "./interactions/CreateComment";

export default function Posts() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/posts/`)
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

    const [disableFeedView, setDisableFeedView] = useState(false);
    const createPostBtnClicked = () => {
        setDisableFeedView(true);
    }

    const createPostBtnCancelled = () => {
        setDisableFeedView(false);

    }

    return (
        <div>
            <CreatePost
                newPostAdded={newPostAdded}
                createPostBtnClicked={createPostBtnClicked}
                createPostBtnCancelled={createPostBtnCancelled}
            />
            <div className={disableFeedView ? "disabled" : ""}>
                {data.map((item) => (
                    <div key={item.id} className="each-post text">
                        <div className="row">
                            <div className="col col-sm-6-col-md-6 col-lg-6">
                                <p className="post-title"><strong>{item.creator.username}</strong> is at <strong>{item.place}</strong></p>
                                <p className="post-date">{item.trip_date}</p>
                            </div>
                            <div className="col col-sm-6-col-md-6 col-lg-6">
                                <h6>options</h6>

                            </div>
                        </div>
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
                            <button className="btn btn-light"><i className="bx bx-comment"></i> Add Comments</button>
                            <button className="btn btn-light"><i className="bx bx-comment"></i> 4</button>
                        </div>
                        
                        <Comments post_id={item.id} />
                    </div>
                ))}
            </div>

        </div>
    )
}