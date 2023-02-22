import { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)


    const navigate = useNavigate();

    let loginUser = async (e) => {
        e.preventDefault();
        let response = await fetch(`http://127.0.0.1:8000/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value })
        })
        let data = await response.json();
        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate('/');
        }
        else {
            alert("Invalid Credentials");
        }
    }

    let logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/login/');
    }

    let updateToken = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': authTokens?.refresh })
        })
        let data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
        }
        else {
            logoutUser();
        }

        if(loading){
            setLoading(false);
        }
    }

    useEffect(() => {

        if (loading) {
            updateToken();
        }

        let fourMins = 1000 * 4 * 60
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, fourMins)
        return () => clearInterval(interval);

    }, [authTokens, loading])


    let contextData = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {loading? null: children}
        </AuthContext.Provider>
    )
}