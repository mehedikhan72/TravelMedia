import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

export default function CreatePost(props) {

    const [isVisible, setIsVisible] = useState(false);
    const [postContent, setPostContent] = useState({
        creator: null,
        post: '',
        place: '',
        trip_date: new Date().toISOString().substring(0, 10),
        trip_duration: 0,
        people_count: 0,
        cost_per_person: 0,
        transportation_data: '',
        staying_place: '',
        staying_place_cost: 0,
        staying_place_rating: 0,
        trip_rating: 0,
        important_things_to_take: '',
        cautions: '',
    });
    const { user } = useContext(AuthContext);
    const placeholderText = `Tell us about your latest trip, ${user.username}!`;

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const resetFormData = () => {
        setPostContent({
            creator: null,
            post: '',
            place: '',
            trip_date: new Date().toISOString().substring(0, 10),
            trip_duration: 0,
            people_count: 0,
            cost_per_person: 0,
            transportation_data: '',
            staying_place: '',
            staying_place_cost: 0,
            staying_place_rating: 0,
            trip_rating: 0,
            important_things_to_take: '',
            cautions: '',
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const accessToken = JSON.parse(localStorage.getItem('authTokens')).access;

        if (accessToken) {
            fetch('http://127.0.0.1:8000/api/posts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(postContent),
            })
                .then((response) => response.json())
                .then((data) => {
                    props.newPostAdded(data);
                    toggleVisibility();
                    resetFormData();
                    console.log(data);
                })
                .catch((error) => console.log(error));
        } else {
            console.log('Error Occured!');
        }
    };

    return (
        <div className="text">
            <input onClick={toggleVisibility} className="post-creation-input-box" type="text" placeholder={placeholderText} />
            {isVisible && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <br />
                        <h2 className='center'>Tell us about you latest trip, {user.username}!</h2>
                        <input required className='post-detail- required' type='text' name='place' placeholder='Where did you Travel to?' onChange={(e) => setPostContent({ ...postContent, place: e.target.value })}></ input> <br />
                        <label required className=' required-label' htmlFor="trip_date">When did you go there?</label>
                        <input required className='post-detail-input' type='date' name='trip_date' id='trip_date' onChange={(e) =>  setPostContent({...postContent, trip_date: e.target.value})}></input> <br />
                        <input required className='post-detail-input' type='number' name='trip_duration' placeholder='How many days were you there?' onChange={(e) =>  setPostContent({...postContent, trip_duration: parseInt(e.target.value)})}></input> <br />
                        <input required className='post-detail-input' type='number' name='people_count' placeholder='How many of you went there?' onChange={(e) => setPostContent({ ...postContent, people_count: parseInt(e.target.value)})}></input> <br />
                        <input required className='post-detail-input' type='number' name='cost_per_person' placeholder='How much did the trip cost for each person?(In BDT)' onChange={(e) => setPostContent({ ...postContent, cost_per_person: parseInt(e.target.value)})}></input> <br />
                        <input required className='post-detail-input' type='text' name='transportation_data' placeholder='How did you go there?' onChange={(e) =>  setPostContent({...postContent, transportation_data: e.target.value})}></input> <br />
                        <input required className='post-detail-input' type='text' name='staying_place' placeholder='Where did you stay?' onChange={(e) =>  setPostContent({...postContent, staying_place: e.target.value})}></input> <br />
                        <input required className='post-detail-input' type='number' name='staying_place_cost' placeholder='How much did your staying place cost for 24 hours?' onChange={(e) => setPostContent({ ...postContent, staying_place_cost: parseInt(e.target.value)})}></input> <br />
                        <input required className='post-detail-input' type='number' name='staying_place_rating' placeholder='How much would you rate your staying place?' onChange={(e) => setPostContent({ ...postContent, staying_place_rating: parseInt(e.target.value)})}></input> <br />
                        <input required className='post-detail-input' type='number' name='trip_rating' placeholder='How much would you rate the entire trip?' onChange={(e) => setPostContent({ ...postContent, trip_rating: parseInt(e.target.value)})}></input> <br />
                        <input className='post-detail-input' type='text' name='important_things_to_take' placeholder='Please mention some of the important things to take.' onChange={(e) =>  setPostContent({...postContent, important_things_to_take: e.target.value})}></input> <br />
                        <input className='post-detail-input' type='text' name='cautions' placeholder='Please mentions the cautions, if any.' onChange={(e) =>  setPostContent({...postContent, cautions: e.target.value})}></input> <br />
                        <textarea required className='post-detail-textarea' type='text' name='post' placeholder='Other than the above data, please enter your thoughts.' onChange={(e) =>  setPostContent({...postContent, post: e.target.value})}></textarea> <br />
                        <input type='submit' placeholder='Post'></input>
                    </form>
                </div>
            )}
        </div>
    )
}