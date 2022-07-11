// credit: ttps://blog.logrocket.com/creating-navbar-react/
import React from 'react';
import {  Link } from "react-router-dom";
import "./navbar.css";
import home_logo from "./home.png";
import library_logo from "./library.png";
const navbar= () =>{
  return (
  <div class = "nav">
    <ul class = "navbar">
      <li>
        <Link to="/"><img src={library_logo} /><br/>Bookstore</Link>
      </li>
      <li>
        <Link to="/swipe"><img src={home_logo} /> <br/>Discover</Link>
      </li>
    </ul>
  </div>
  );
}
export default navbar;
