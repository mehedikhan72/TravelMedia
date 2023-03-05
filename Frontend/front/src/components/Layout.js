import React, { useContext, useEffect, useState } from "react";
import Posts from "./Posts";
import CreatePost from "./CreatePost";
import TopNav from "./TopNav";
import AuthContext from "../context/AuthContext";
import Profile from "./Profile";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function Layout() {

  let { logoutUser } = useContext(AuthContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mode, setMode] = useState(localStorage.getItem('mode'));

  const [darkMode, setDarkMode] = useState(localStorage.getItem('mode') === 'dark-mode' ? true : false);

  const body = document.querySelector('body');

  const handleSidebarToggle = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  const handleSearchClick = () => {
    setSidebarOpen(false);
  };

  const handleModeToggle = () => {
    setDarkMode((prevState) => !prevState);
    if (!darkMode) {
      setMode('dark-mode');
      localStorage.setItem('mode', 'dark-mode');
    }
    else {
      setMode('light-mode');
      localStorage.setItem('mode', 'light-mode');
    }
  };


  if (mode === 'dark-mode') {
    body.classList.add('dark');
  }
  else if (mode === 'light-mode') {
    body.classList.remove('dark');
  }

  return (
    <div>
      <nav className={`sidebar ${sidebarOpen ? "close" : ""}`}>
        <header>
          <div className="image-text">
            <span className="image"></span>

            <div className="text logo-text">
              <span className="name">TravelMedia</span>
              <span className="profession">some cool text</span>
            </div>
          </div>

          <i className="bx bx-chevron-right toggle" onClick={handleSidebarToggle}></i>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <li className="search-box" onClick={handleSearchClick}>
              <i className="bx bx-search icon"></i>
              <input type="text" placeholder="Search..." />
            </li>

            {/* ul removed since bootstrap was causing issues here */}
            <li className="nav-link">
              <a href="#">
                <i className="bx bx-home-alt icon"></i>
                <span className="text nav-text">Dashboard</span>
              </a>
            </li>

            <li className="nav-link">
              <a href="#">
                <i className="bx bx-bar-chart-alt-2 icon"></i>
                <span className="text nav-text">Revenue</span>
              </a>
            </li>

            <li className="nav-link">
              <a href="#">
                <i className="bx bx-bell icon"></i>
                <span className="text nav-text">Notifications</span>
              </a>
            </li>

            <li className="nav-link">
              <a href="#">
                <i className="bx bx-pie-chart-alt icon"></i>
                <span className="text nav-text">Analytics</span>
              </a>
            </li>

            <li className="nav-link">
              <a href="#">
                <i className="bx bx-heart icon"></i>
                <span className="text nav-text">Likes</span>
              </a>
            </li>

            <li className="nav-link">
              <a href="#">
                <i className="bx bx-wallet icon"></i>
                <span className="text nav-text">Wallets</span>
              </a>
            </li>
          </div>

          <div className="bottom-content">
            <li className="">
              <a onClick={logoutUser}>
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Logout</span>
              </a>
            </li>

            <li className="mode" onClick={handleModeToggle}>
              <div className="sun-moon">
                <i className="bx bx-moon icon moon"></i>
                <i className="bx bx-sun icon sun"></i>
              </div>
              <span className="mode-text text">{darkMode ? "Light mode" : "Dark mode"}</span>

              <div className="toggle-switch">
                <span className={`switch ${darkMode ? "on" : ""}`}></span>
              </div>
            </li>
          </div>
        </div>
      </nav>

      {/* For the sake of all other components accessing the states declared in this component, Sidebar.js 
            is used here as App.js and this is the place where I'll be stacking the components. */}
      <section className="home">
        <TopNav />
        <Routes>
          <Route index element={<Posts />} />
          <Route path="/profiles/:username" element={<Profile />} />
        </Routes>
      </section>
    </div>
  )
}