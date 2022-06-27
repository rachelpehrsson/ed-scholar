
import PropTypes from "prop-types"
//import './fonts.css'
import React, {Component} from "react"
import {useLocation} from 'react-router-dom';
  
const ArticlePage = () => {
   //console.log(props);
    const location = useLocation();
    console.log(location);
    console.log("here");
  return (
    <div>
      <h1>{location.state.title}</h1>
      {location.state.text}
    </div>
  );
};
  
export default ArticlePage;