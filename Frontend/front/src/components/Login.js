import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Login() {

    let { loginUser } = useContext(AuthContext);
    let { user } = useContext(AuthContext);

    return (
        <div className="login-reg-form">
            {user && <Navigate to="/" />}
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <input className="form-control" name="username" type="text" placeholder="Username" />
                <input className="form-control" name="password" type="password" placeholder="Password" />
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}