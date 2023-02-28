import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Register() {
    let { loginUser } = useContext(AuthContext);
    let { user } = useContext(AuthContext);
    { user && <Navigate to="/" /> }
    return (
        <div className="login-reg-form">
            {user && <Navigate to="/" />}
            Reg form
        </div>
    )
}