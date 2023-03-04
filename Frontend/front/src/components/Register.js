import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Register() {
    let { user } = useContext(AuthContext);
    let { loginUser } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm_password] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = { username, email, password };
        fetch('http://localhost:8000/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                loginUser(e);
            })
            .catch(error => console.log(error));
    }

    { user && <Navigate to="/" /> }
    return (
        <div className="login-reg-form">
            {user && <Navigate to="/" />}
            <div className="login-reg-form">
                {user && <Navigate to="/" />}
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input required className="form-control" name="username" value={username} type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <input required className="form-control" name="email" value={email} type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input required className="form-control" name="password" value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <input required className="form-control" name="confirm_password" value={confirm_password} type="password" placeholder="Confirm Password" onChange={(e) => setConfirm_password(e.target.value)} />
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </div>
    )
}