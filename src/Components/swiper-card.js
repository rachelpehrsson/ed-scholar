import PropTypes from "prop-types"
//import './fonts.css'
import React, {Component} from "react"
//import Image from '../components/image.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {faCircleChevronRight} from '@fortawesome/free-solid-svg-icons';

class SwiperCard extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			open: false
		}
	} 
	render(){
	const readClick=event=>{
		this.props.readMoreFunc();
	}

	const navClick=event=>{
		 let className = event.currentTarget.className;
		 this.props.arrowNavFunc(className);
	}

	return(
		<div className = "swiper-card article"/*{'piece ${ this.state.open }'}*/ >
		<div className = "main-image">
		<img src = { this.props.path }/>
		</div>
		<div className = "article-title">
		{ this.props.title }
		</div>
		<div className = "preview">
			{this.props.previewtext}
		</div>
		<div className = "stats">
		</div>
		<div className = "lower-menu">
		 <div className="article-nav prev" onClick={navClick}><FontAwesomeIcon icon={faCircleChevronLeft} /></div>
		<span onClick = {readClick} >Read More</span>
		<div className="article-nav next" onClick={navClick}><FontAwesomeIcon icon={faCircleChevronRight} /></div>
		</div>
		</div>
	);
	}
}

SwiperCard.propTypes = {
  title: PropTypes.string.isRequired, 
  path: PropTypes.string, 
  previewtext:PropTypes.string, 
  readMoreFunc:PropTypes.func, 
  arrowNavFunc:PropTypes.func
}



export default SwiperCard