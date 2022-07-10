
import PropTypes from "prop-types"
//import './fonts.css'
import React, {Component} from "react"
import {useLocation} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHighlighter } from '@fortawesome/free-solid-svg-icons';
import {faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {faCircleChevronRight} from '@fortawesome/free-solid-svg-icons';
import {faQuestion} from '@fortawesome/free-solid-svg-icons';
import HighlighterSelect from "./highlighter-select"


const ArticlePage = () => {

   //console.log(props);
    const location = useLocation();
    console.log(location);
    console.log(location.state.text);
    const pages = location.state.text;
    const currentPage = 0;

let colorMap = new Map();
colorMap.set("green", "#7FBA00");
colorMap.set("red", "#EA4D33");

let highlightedContents = new Map();
highlightedContents.set("green", new Array());
highlightedContents.set("red", new Array());

let currentColor = "green";

const readSelection=()=>{
  if(window.getSelection()){
    let selection = getSelectionHtml();
    console.log("selection:"+ selection);
    console.log(document.selection);
    let pageContent = document.getElementById("content");
    let highlighted = "<div class='hl hl-"+currentColor+"'>"+selection+"</div>";
    pageContent.innerHTML = pageContent.innerHTML.replace(selection, highlighted);
    highlightedContents.get(currentColor).push(window.getSelection());
    //page
  }
}

const getSelectionHtml=()=> {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    return html;
}

const parseText =(txt)=>{
  if(txt){
    let sentences = txt.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/);
    let parsed = "";
    for(let sentence in sentences){
      parsed += "<span class = 'hl-node' id='"+sentence+"'>"+sentences[sentence]+" </span>";
    }
    return parsed;
  }
}

const setHighlighterColor=(color)=>{
    let selector = document.getElementById("selector");
    currentColor = color;
    selector.style.color = colorMap.get(currentColor);
    document.getElementById("color-menu").style.display = "none";
}

const showQuestion=()=>{

}

  return (

    <>
    <div className="page-view">
    <div className="page-nav prev"><FontAwesomeIcon icon={faCircleChevronLeft} /></div>
    <div className="page">
      <h1>{pages[currentPage].title}</h1>
      <HighlighterSelect colorClick = {setHighlighterColor}/>
      <div id = "content" className="text-content" onMouseUp={e=>readSelection(e)} dangerouslySetInnerHTML={{__html:parseText(pages[currentPage].content)}}>
      </div>
    </div>
    <div className="page-nav next"><FontAwesomeIcon className = "question-icon" icon={faQuestion} onClick = {showQuestion} /></div>
    </div>

    </>
  );
};

export default ArticlePage;
