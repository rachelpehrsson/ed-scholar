import PropTypes from "prop-types";
//import './fonts.css'
import React, {Component} from "react";

class HighlighterSelections extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			open: false
		}
	}

	render(){
		return(
			);
	}
}

HighlighterSelections.propTypes = {
  colors: PropTypes.node,
  active: PropTypes.bool, 
  colorClick: PropTypes.func
}

export default HighlighterSelections