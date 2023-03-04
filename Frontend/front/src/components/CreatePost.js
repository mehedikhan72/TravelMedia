import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

export default function CreatePost(props) {

    const [isVisible, setIsVisible] = useState(false);

    let { user } = useContext(AuthContext);

    let placeholderText = "Tell us about your latest trip, " + user.username + "!";
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    }

    const [place, setPlace] = useState("");

    const today = new Date().toISOString().substring(0, 10); // Get today's date in ISO format.
    const [tripDate, setTripDate] = useState(today);

    const [tripDuration, setTripDuration] = useState(0);
    const [peopleCount, setPeopleCount] = useState(0);
    const [costPerPersson, setCostPerPerson] = useState(0);
    const [transportationData, setTransportationData] = useState("");
    const [stayingPlace, setStayingPlace] = useState("");
    const [stayingPlaceCost, setStayingPlaceCost] = useState(0);
    const [stayingPlaceRating, setStayingPlaceRating] = useState(0);
    const [tripRating, setTripRating] = useState(0);
    const [importantThingsToTake, setImportantThingsToTake] = useState("");
    const [cautions, setCautions] = useState("");
    const [post, setPost] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()

        const postContent = {
            creator: null,
            post: post,
            place: place,
            trip_date: tripDate,
            trip_duration: tripDuration,
            people_count: peopleCount,
            cost_per_person: costPerPersson,
            transportation_data: transportationData,
            staying_place: stayingPlace,
            staying_place_cost: stayingPlaceCost,
            staying_place_rating: stayingPlaceRating,
            trip_rating: tripRating,
            important_things_to_take: importantThingsToTake,
            cautions: cautions
        };


        const accessToken = JSON.parse(localStorage.getItem('authTokens')).access;

        if(accessToken){
            fetch('http://127.0.0.1:8000/api/posts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(postContent)
            })
                .then(response => response.json())
                .then(data => {
                    props.newPostAdded(data);
                    toggleVisibility();
                    console.log(data);
                })
                .catch(error => console.log(error));
        }
        else{
            console.log("Error Occured!");
        }
        

    }
    return (
        <div className="text">
            <input onClick={toggleVisibility} className="post-creation-input-box" type="text" placeholder={placeholderText} />
            {isVisible && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <br />
                        <h2 className='center'>Tell us about you latest trip, {user.username}!</h2>
                        <input className='post-detail-input' type='text' name='place' placeholder='Where did you Travel to?' onChange={(e) => setPlace(e.target.value)}></input> <br />
                        <label className='input-label' htmlFor="trip_date">When did you go there?</label>
                        <input className='post-detail-input' type='date' name='trip_date' id='trip_date' onChange={(e) => setTripDate(e.target.value)}></input> <br />
                        <input className='post-detail-input' type='number' name='trip_duration' placeholder='How many days were you there?' onChange={(e) => setTripDuration(parseInt(e.target.value))}></input> <br />
                        <input className='post-detail-input' type='number' name='people_count' placeholder='How many of you went there?' onChange={(e) => setPeopleCount(parseInt(e.target.value))}></input> <br />
                        <input className='post-detail-input' type='number' name='cost_per_person' placeholder='How much did the trip cost for each person?(In BDT)' onChange={(e) => setCostPerPerson(parseInt(e.target.value))}></input> <br />
                        <input className='post-detail-input' type='text' name='transportation_data' placeholder='How did you go there?' onChange={(e) => setTransportationData(e.target.value)}></input> <br />
                        <input className='post-detail-input' type='text' name='staying_place' placeholder='Where did you stay?' onChange={(e) => setStayingPlace(e.target.value)}></input> <br />
                        <input className='post-detail-input' type='number' name='staying_place_cost' placeholder='How much did your staying place cost for 24 hours?' onChange={(e) => setStayingPlaceCost(parseInt(e.target.value))}></input> <br />
                        <input className='post-detail-input' type='number' name='staying_place_rating' placeholder='How much would you rate your staying place?' onChange={(e) => setStayingPlaceRating(parseInt(e.target.value))}></input> <br />
                        <input className='post-detail-input' type='number' name='trip_rating' placeholder='How much would you rate the entire trip?' onChange={(e) => setTripRating(parseInt(e.target.value))}></input> <br />
                        <input className='post-detail-input' type='text' name='important_things_to_take' placeholder='Please mention some of the important things to take.' onChange={(e) => setImportantThingsToTake(e.target.value)}></input> <br />
                        <input className='post-detail-input' type='text' name='cautions' placeholder='Please mentions the cautions, if any.' onChange={(e) => setCautions(e.target.value)}></input> <br />
                        <textarea className='post-detail-textarea' type='text' name='post' placeholder='Other than the above data, please enter your thoughts.' onChange={(e) => setPost(e.target.value)}></textarea> <br />
                        <input type='submit' placeholder='Post'></input>
                    </form>
                </div>
            )}
        </div>
    )
}