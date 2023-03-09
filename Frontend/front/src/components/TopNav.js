import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function TopNav() {

    let {user } = useContext(AuthContext);

    return (
        <div className="topnav-parent">

        
        <div className="text topnav">
            <div className="main-searchbox topnav-left">
                <form>
                    <input className="main-searchbox-input" required type="test" placeholder="Search a place or a person..." />
                    <button className="search-icon box-icons" type="submit"><i className="bx bx-search-alt-2 icon" /></button>
                </form>
            </div>
            <div className="topnav-right">
                <button className="bell-icon round-icons"><i className="bx bx-bell icon" /></button>
                <Link to={{ pathname: `/profiles/${user.username}` }}>
                    <button className="user-icon round-icons"><i className="bx bx-user icon" /></button>
                </Link>
            </div>
            <br />
        </div>
        </div>
    )
}