import React, { useContext, useEffect, useState } from "react";
import Posts from "./Posts";
import CreatePost from "./CreatePost";
import AuthContext from "../context/AuthContext";
import Profile from "./Profile";
import '../App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function Layout() {

  let { logoutUser } = useContext(AuthContext);
  let { user } = useContext(AuthContext);

  const [menuClicked, setMenuClicked] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  const handleThemeChange = (e) => {
    console.log("theme changed");
    localStorage.setItem('theme', e.target.value);
    setTheme(localStorage.getItem('theme'));
  }

  return (
    <div className={theme !== '' ? theme : ""}>
      {/* For the sake of all other components accessing the states declared in this component, Layout.js 
            is used here as App.js and this is the place where I'll be stacking the components. */}
      <header>
        <div className="logo-n-search">
          <Link className="logo"><img width="50" src="https://i.pinimg.com/originals/de/82/29/de822902b1f27718862f9453277c91ce.jpg"></img></Link>
          {/* <i className='nav-logo bx bx-run'></i> */}
          <form className="search-form">
            <input required className="search-box"></input>
            <button className="search-btn" type="submit"><i className='bx bx-search-alt-2'></i></button>
          </form>
        </div>

        <div className="my-navbar">
          <Link onClick={() => setMenuClicked(!menuClicked)} to="/"><i className='scale-1-10 nav-logo bx bx-home' ></i></Link>
          <Link><i className='scale-1-10 nav-logo bx bx-group'></i></Link>
        </div>

        <div className="main-options">
          <i onClick={() => setMenuClicked(!menuClicked)} className={menuClicked === false ? "scale-1-10 nav-logo bx bx-menu" : "scale-1-10 nav-logo bx bx-x"} id="menu-icon" ></i>
          <Link><i className='scale-1-10 nav-logo bx bx-bell'></i></Link>
          <Link to={{ pathname: `/profiles/${user.username}` }}><i className='scale-1-10 nav-logo bx bx-user'></i></Link>
        </div>
      </header>
      <div>
        <div className={menuClicked === false ? "sidenav" : "sidenav open"}>
          <div>
            <Link onClick={() => setMenuClicked(!menuClicked)} to="/" className="scale-1-10 sidenav-links"><i className='extra-icon nav-logo bx bx-home' ></i><span className="extra-icon">HOME</span></Link>
            <Link className="scale-1-10 sidenav-links"><i className='extra-icon nav-logo bx bx-group'></i><span className="extra-icon">PEOPLE</span></Link>
            <Link className="scale-1-10 sidenav-links"><i className='nav-logo bx bx-bookmarks'></i><span>SAVED POSTS</span></Link>
            <Link className="scale-1-10 sidenav-links"><i className='nav-logo bx bx-map'></i><span>MAP</span></Link>
            {/* <div className="dark-mode-div form-check form-switch">
              <label className="form-check-label" for="flexSwitchCheckDefault">Dark Mode</label>
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
              
              
            </div> */}

            <span className="scale-1-10 sidenav-links theme-selection">
              <i className='nav-logo bx bx-moon'></i>
              <select onChange={handleThemeChange} className="form-select" aria-label="Default select example">
                <option defaultValue={theme !== '' ? theme : ""}>THEME</option>
                <option value="light">LIGHT</option>
                <option value="dark">DARK</option>
                <option value="navy">NAVY</option>
              </select>
            </span>

            <Link onClick={logoutUser} className="scale-1-10 sidenav-links"><i className='nav-logo bx bx-log-out'></i><span>LOGOUT</span></Link>
          </div>
        </div>
        <div className="main-content">
          <Routes>
            <Route index element={<Posts />} />
            <Route path="/profiles/:username" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}