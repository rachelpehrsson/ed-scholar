
import PropTypes from "prop-types"
//import './fonts.css'
import React, {Component, useState} from "react"
import {useLocation} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHighlighter } from '@fortawesome/free-solid-svg-icons';
import {faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {faCircleChevronRight} from '@fortawesome/free-solid-svg-icons';
import {faQuestion, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {HighlighterSelect, Color} from "./highlighter-select"
import PageQuestion from "./page-question"
import HighlighterSelections from "./highlight-selection";
import PopUp from "./popup"
import { renderToString } from 'react-dom/server'

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
colorMap.set("yellow", "#F09609");

let highlightedContents = new Map();
highlightedContents.set("green", new Array());
highlightedContents.set("red", new Array());
highlightedContents.set("yellow", new Array());

const [hlMap, setHighlightMap] = useState(highlightedContents);

// const updateHightlightMap=(color, value)=> {

// }

const [currentColor,setCurrentColor] = useState("green"); 
//dangerouslySetInnerHTML={{__html:selection}}

function toggleTooltip(e){
 let tooltip = e.currentTarget.querySelector(".colors");
 tooltip.classList.toggle("active");
}

let changeColor = function(e){
  let color = e.currentTarget.classList[1];
  let hl = e.currentTarget.parentElement.parentElement.parentElement;
  let prevColor = hl.classList[1].replace("hl-", "");
  hl.className = "hl hl-"+color;
  let text = hl.querySelector(".hl-content").innerText.replace("<(.*?)\>", '');

  highlightedContents = new Map(hlMap);
  highlightedContents.get(prevColor).splice(highlightedContents.get(prevColor).indexOf(text),1);
  highlightedContents.get(color).push(text);
  setHighlightMap(highlightedContents);  
}

let deleteHighlight = function(e){
  let hl = e.currentTarget.parentElement.parentElement.parentElement;
  let prevColor = hl.classList[1].replace("hl-", "");
  let text = hl.querySelector(".hl-content").textContent;
  let pageContent = document.getElementById("content");
  let innerHTML = pageContent.innerHTML.slice();
  let parsedHTML = innerHTML.replace(hl.outerHTML, text);
  pageContent.innerHTML = parsedHTML;

  highlightedContents = new Map(hlMap);
  highlightedContents.get(prevColor).splice(highlightedContents.get(prevColor).indexOf(text),1);
  setHighlightMap(highlightedContents);  
}

const createHighlight=(selection)=>{
  return(
    <span className={'hl hl-'+currentColor} onClick={toggleTooltip} >
        <span className="tooltip">
        <span id="color-menu" className = "colors">
          <Color color={"green"}/>
          <Color color={"red"}/>
          <Color color={"yellow"}/>
          <span className="delete">
          <FontAwesomeIcon icon={faTrashCan}/></span>
          <span className="close">x</span>
        </span>
       </span>
        <span className="hl-content" dangerouslySetInnerHTML={{__html:selection}}>
        </span>
    </span>
    );
}

const readSelection=()=>{
  if(window.getSelection() && window.getSelection().toString()!=""){
    let selection = getSelectionHtml();
    let selectionStr = window.getSelection().toString();
    let pageContent = document.getElementById("content");
    //let highlighted = "<span class='hl hl-"+currentColor+"'><span class='tooltip'>"+selection+"</span>";
    let highlighted = renderToString(createHighlight(selection));
    let innerHTML = pageContent.innerHTML.slice();
    let parsedHTML = innerHTML.replace(selection, highlighted);
    pageContent.innerHTML = parsedHTML;
    highlightedContents = new Map(hlMap);
    highlightedContents.get(currentColor).push(selectionStr);
    setHighlightMap(highlightedContents);

    //Set event listeners needed for interaction
    let highlights = document.getElementsByClassName("hl");
    for(let highlight of highlights){
      if(!highlight.onclick) {
        highlight.addEventListener("click", function(e){
          let tooltip = e.currentTarget.querySelector(".colors");
          tooltip.classList.toggle("active");
        });
      }

      let colorDots = highlight.querySelectorAll(".color-option");
      for(let dot of colorDots){
        dot.addEventListener("click",changeColor);
      }
      let deleteButt = highlight.querySelector(".delete");
      deleteButt.addEventListener("click", deleteHighlight);

    }

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
    setCurrentColor(color);
    document.getElementById("selector").style.color = colorMap.get(color);
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
    if(next!=(pages.length-1))
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

const on =()=>{
  document.getElementById("overlay").style.display = "block";
}

let popUpTxt = "As you read the articles, think about what lines you agree with. What sounds new to you? What do you disagree with? <ul> <li style='color:#7FBA00'>Highlight the point you agree with using green color</li> <li style='color:#F09609'>Highlight things that sound new to you with yellow color </li> <li style='color:#EA4D33'>Highlight things you disagree with red color</li></ul> Use the highlight icon at the top of the page to choose the color."

  return (

    <>
    <PopUp innerText = {popUpTxt} initialShow = {(currentPage==0)} />
    <div className="page-view">
    <div className={"page-nav prev "+(currentPage==0?"lock":"")}><FontAwesomeIcon icon={faCircleChevronLeft} onClick={prevPage} /></div>
    <div className="page">
      <h1>{pages[currentPage].title}</h1>
      <div className="action-bar">
      <HighlighterSelect colorClick = {setHighlighterColor}/>
      <div className="hl-instructions" onClick ={on}>Highlighting Guide</div>
      </div>
      <div id = "content" className="text-content" onMouseUp={e=>readSelection(e)} onTouchEnd={e=>readSelection(e)} dangerouslySetInnerHTML={{__html:parseText(pages[currentPage].content)}}>
      </div>
      {addQuestion()}
    </div>
    <div className={"page-nav next "+(currentPage==(pages.length-1)?"lock":"")} id="next" >
      {availableQuestion && !questionComplete && (<FontAwesomeIcon className = 'question-icon' icon={faQuestion} onClick = {showQuestion} />)}
      {(!availableQuestion || questionComplete) && (<FontAwesomeIcon icon={faCircleChevronRight} onClick={nextPage} />)}
    </div> 
    </div>
    <div className="highlight-contents">
     {(currentPage==(pages.length-1))&&(<HighlighterSelections highlightMap={hlMap} />)}
     </div>
    </>
  );



};

  
export default ArticlePage;

