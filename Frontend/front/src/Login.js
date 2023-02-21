import React, { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

    }
    return (
        <div className="login-reg-form">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input class="form-control" value={username} type="text"
                    onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <input class="form-control" value={password} type="password"
                    onChange={(e) => setPassword(e.target.value)} placeholder="Password " />
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}