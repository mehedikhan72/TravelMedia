import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

export default function CreatePost() {

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
            post, place, tripDate, tripDuration, peopleCount, costPerPersson, transportationData, stayingPlace,
            stayingPlaceCost, stayingPlaceRating, tripRating, importantThingsToTake, cautions
        }

        // Getting a new access token to send w the fetch request.

        const refreshToken = JSON.parse(localStorage.getItem('authTokens')).refresh;
        //console.log(refreshToken);
        fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'refresh': refreshToken // use the current token
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // So the user stays logged in.
                localStorage.setItem('authTokens', JSON.stringify(data));
                const token = data.access;
                fetch('http://127.0.0.1:8000/api/posts/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(postContent)
                })
                    .then(response => response.json())
                    .then(data => {
                        toggleVisibility();
                        console.log(data);
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));

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
                        <input className='post-detail-input' type='number' name='trip_duration' placeholder='How many days were you there?' onChange={(e) => setTripDuration(e.target.value)}></input> <br />
                        <input className='post-detail-input' type='number' name='people_count' placeholder='How many of you went there?' onChange={(e) => setPeopleCount(e.target.value)}></input> <br />
                        <input className='post-detail-input' type='number' name='cost_per_person' placeholder='How much did the trip cost for each person?(In BDT)' onChange={(e) => setCostPerPerson(e.target.value)}></input> <br />
                        <input className='post-detail-input' type='text' name='transportation_data' placeholder='How did you go there?' onChange={(e) => setTransportationData(e.target.value)}></input> <br />
                        <input className='post-detail-input' type='text' name='staying_place' placeholder='Where did you stay?' onChange={(e) => setStayingPlace(e.target.value)}></input> <br />
                        <input className='post-detail-input' type='number' name='staying_place_cost' placeholder='How much did your staying place cost for 24 hours?' onChange={(e) => setStayingPlaceCost(e.target.value)}></input> <br />
                        <input className='post-detail-input' type='number' name='staying_place_rating' placeholder='How much would you rate your staying place?' onChange={(e) => setStayingPlaceRating(e.target.value)}></input> <br />
                        <input className='post-detail-input' type='number' name='trip_rating' placeholder='How much would you rate the entire trip?' onChange={(e) => setTripRating(e.target.value)}></input> <br />
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