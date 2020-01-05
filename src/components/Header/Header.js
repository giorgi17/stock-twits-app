import React from 'react';
import './Header.css';
import {NavLink} from 'react-router-dom';

var myFunction = () => {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive"
    } else {
        x.className = "topnav"
    }
}

const header = () => (
    <header className="App-header">
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

        <nav class="topnav" id="myTopnav">
            <a href="#home" class="active">Home</a>
            <a href="#news">News</a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
            <a href="javascript:void(0);" class="icon" onClick={myFunction}>
                <i class="fa fa-bars"></i>
            </a>
        </nav>
            
        

        {/* Below is an old code! */}
        <nav>
            <ul className="nav-links">
                <li>
                    {/* <NavLink
                    className="nav-link"
                    to="/messages/"
                    exact>   */}
                    Messages
                    {/* </NavLink> */}
                </li>
                <li>
                    {/* <NavLink
                    className="nav-link"
                    to="/new-message/"
                    exact>   */}
                    New message
                    {/* </NavLink> */}
                </li>
                <li><a className="nav-link" href="#">Contact</a></li>
            </ul>
        </nav>
        <div className="login-logout">
            <h4>Login</h4>
        </div>
      </header>
);

export default header;