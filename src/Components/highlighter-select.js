import PropTypes from "prop-types";
//import './fonts.css'
import React, {Component} from "react";
import {useLocation} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHighlighter } from '@fortawesome/free-solid-svg-icons';


let colorClick;

class HighlighterSelect extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			open: false, 
			active:false
		}
	}

	render(){

	colorClick = this.props.colorClick;

	const openHighlighterMenu=()=>{
		if(!this.state.active){
    		document.getElementById("color-menu").style.display = "inline-flex";
    		this.state.active = true;
		}
		else{
			document.getElementById("color-menu").style.display = "none";
			this.state.active = false;
		}
    }
	return(
		<>
		<div id = "selector" className = "selector" onClick = {openHighlighterMenu}>
			<FontAwesomeIcon icon={faHighlighter} />
		</div>
		<div id="color-menu" className = "colors">
			<Color color={"green"} runClick={runClick}/>
			<Color color={"red"} runClick={runClick}/>
			<Color color={"yellow"} runClick={runClick}/>
		</div>
		</>
	);
	}
}


	const runClick=event=>{
		console.log("color call");
		const color = event.currentTarget.classList[1];
		colorClick(color);
	}


const Color = ({color, runClick}) =>{
  		 return (
    		<span className={"color-option "+color} value={color} onClick={runClick}>
      			<span className = "dot" color={color} ></span>
    		</span>
  			);
	};

HighlighterSelect.propTypes = {
  colors: PropTypes.node,
  active: PropTypes.bool, 
  colorClick: PropTypes.func
}

export {HighlighterSelect, Color}