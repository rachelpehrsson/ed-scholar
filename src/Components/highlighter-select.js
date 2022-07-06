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
			open: false
		}
	}

	render(){

	const runClick=event=>{
		const color = event.currentTarget.classList[1];
		this.props.onClick(color);
	}

	const Color = ({color}) =>{
  		 return (
    		<div className={"color-option "+color} onClick = {runClick} value={color}>
      			<span className = "dot" color={color} ></span>
    		</div>
  			);
	};
	return(
		<>
		<div className = "selector" >
			<FontAwesomeIcon icon={faHighlighter} />
		</div>
		<div className = "colors">
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
  onClick: PropTypes.func
}

export default HighlighterSelect