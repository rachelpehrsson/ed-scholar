import PropTypes from "prop-types";
//import './fonts.css'
import React, {Component} from "react";
import {useLocation} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHighlighter } from '@fortawesome/free-solid-svg-icons';

class HighlighterSelect extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			open: false, 
			active:false
		}
	}

	render(){

	const runClick=event=>{
		const color = event.currentTarget.classList[1];
		this.props.colorClick(color);
	}

	const Color = ({color}) =>{
  		 return (
    		<div className={"color-option "+color} onClick = {runClick} value={color}>
      			<span className = "dot" color={color} ></span>
    		</div>
  			);
	};
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
			<Color color={"green"}/>
			<Color color={"red"}/>
		</div>
		</>
	);
	}
}

HighlighterSelect.propTypes = {
  colors: PropTypes.node,
  active: PropTypes.bool, 
  colorClick: PropTypes.func
}

export default HighlighterSelect