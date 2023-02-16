import React, { useEffect, useState } from "react";
import Posts from "./Posts";
export default function SideBar() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const body = document.querySelector('body');

    const handleSidebarToggle = () => {
        setSidebarOpen((prevState) => !prevState);
    };

    const handleSearchClick = () => {
        setSidebarOpen(false);
    };

    const handleModeToggle = () => {
        setDarkMode((prevState) => !prevState);
        body.classList.toggle("dark");
    };

    return (
        <div>
            <nav className={`sidebar ${sidebarOpen ? "close" : ""}`}>
                <header>
                    <div className="image-text">
                        <span className="image"></span>

                        <div className="text logo-text">
                            <span className="name">Codinglab</span>
                            <span className="profession">Web developer</span>
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

                        <ul className="menu-links">
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
                        </ul>
                    </div>

                    <div className="bottom-content">
                        <li className="">
                            <a href="#">
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

            {/* <section className="home">

            </section> */}

        </div>
    )
}