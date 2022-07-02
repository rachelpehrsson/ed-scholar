
import PropTypes from "prop-types"
//import './fonts.css'
import React, {Component} from "react"
import {useLocation} from 'react-router-dom';
  
const ArticlePage = () => {
   //console.log(props);
    const location = useLocation();
    console.log(location);
    console.log(location.state.text);
    const pages = location.state.text;
    const currentPage = 0;

const parseText =(txt)=>{
  if(txt){
    let sentences = txt.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/);
    let parsed = "";
    for(let sentence of sentences){
      parsed += "<span class = 'hl-node'>"+sentence+" </span>";
    }
    return parsed;
  }
}

  return (
    <div className="page">
      <h1>{pages[currentPage].title}</h1>
      <div className="text-content" dangerouslySetInnerHTML={{__html:parseText(pages[currentPage].content)}}>
      </div>
    </div>
  );
};
  
export default ArticlePage;