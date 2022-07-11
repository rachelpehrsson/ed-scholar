
import PropTypes from "prop-types"
//import './fonts.css'
import React, {Component, useState} from "react"
import {useLocation} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHighlighter } from '@fortawesome/free-solid-svg-icons';
import {faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {faCircleChevronRight} from '@fortawesome/free-solid-svg-icons';
import {faQuestion} from '@fortawesome/free-solid-svg-icons';
import HighlighterSelect from "./highlighter-select"
import PageQuestion from "./page-question"

const ArticlePage = () => {

   //console.log(props);
    const location = useLocation();
    console.log(location);
    console.log(location.state.text);
    const pages = location.state.text;
    //let currentPage = 0;

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
  //change to every character
  //don't split - parse through array? 
  //skip if an image
  if(txt){
    //let sentences = txt.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/);
    let parsed = "";
    let isImage = false;
    let imageString = "";
    for(let i = 0;i<txt.length;i++){
      if(txt[i]==="<"&&txt[i+1]==="p"){
        parsed+="<p>";
        i+=2;
      }
      else if(txt[i]==="<"&&txt[i+1]==="/"){
        parsed+="</p>";
        i+=3;
      }
      else{
        if(txt.substring(i, i+4)=="<img")
          isImage = true;
        if(isImage)
          imageString+=txt[i];
        if(!isImage)
          parsed += "<span class = 'hl-node' id='"+i+"'>"+txt[i]+"</span>";
        if(isImage && txt[i]==">"){
          parsed+=imageString;
          isImage = false;
        }
      }
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

let availableQuestion = false;

const [questionComplete, setQuestionState] = useState(false);

const addQuestion=()=>{
  let question = pages[currentPage].question;
  if(question.text){
    availableQuestion = true;
    return(
      <PageQuestion text={question.text} options={question.options} answer={question.answer} activateNext={activateNext} />
    );
  }
  else{
    return "";
  }
}

const showQuestion=()=>{
  let questions = document.getElementsByClassName("question");
  for(let question of questions){
    question.style.display="inline-block";
  }
 activateNext(); 
}

//remove if bug is fixed
  const hideQuestion=()=>{
  let questions = document.getElementsByClassName("question");
  for(let question of questions){
    question.style.display="none";
  }
}

const [currentPage,setActiveIndex] = useState(0); 

const nextPage =()=>{
  let next = currentPage+1;
  if(next<pages.length){
    if(availableQuestion)
      availableQuestion=false;
    if(questionComplete)
      setQuestionState(false);
    setActiveIndex(next);
    hideQuestion();
  }
}

const activateNext = ()=>{
  setQuestionState(true);
}

const prevPage =()=>{
  let prev = currentPage-1;
  if(prev>=0)
    setActiveIndex(prev);
}


  return (

    <>
    <div className="page-view">
    <div className={"page-nav prev "+(currentPage==0?"lock":"")}><FontAwesomeIcon icon={faCircleChevronLeft} onClick={prevPage} /></div>
    <div className="page">
      <h1>{pages[currentPage].title}</h1>
      <HighlighterSelect colorClick = {setHighlighterColor}/>
      <div id = "content" className="text-content" onMouseUp={e=>readSelection(e)} dangerouslySetInnerHTML={{__html:parseText(pages[currentPage].content)}}>
      </div>
      {addQuestion()}
    </div>
    <div className={"page-nav next "+(currentPage==(pages.length-1)?"lock":"")} id="next" >
      {availableQuestion && !questionComplete && (<FontAwesomeIcon className = 'question-icon' icon={faQuestion} onClick = {showQuestion} />)}
      {(!availableQuestion || questionComplete) && (<FontAwesomeIcon icon={faCircleChevronRight} onClick={nextPage} />)}
    </div>
    </div>

    </>
  );



};

  
export default ArticlePage;

