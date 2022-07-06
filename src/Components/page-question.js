import PropTypes from "prop-types"
//import './fonts.css'
import React, {Component} from "react"
//import Image from '../components/image.js';

class PageQuestion extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			open: false
		}
	}

	const openQuestion =()=>{

	}


	render(){
	return(
		<>
		<div className = "question-icon" onClick = {openQuestion()}></div>
		<div className = "question">
			<div className = "question-text">
			</div>
		</div>
	);
	}
}

PageQuestion.propTypes = {
  text: PropTypes.string, 
  options: PropTypes.array,
  answer: PropTypes.string
}

PageQuestion.propTypes  = {
   text: '', 
   options: [],
   answer:''
}

export default SwiperCard