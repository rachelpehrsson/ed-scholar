import PropTypes from "prop-types"
//import './fonts.css'
import React, {Component} from "react"
//import Image from '../components/image.js';

class ProgressBar extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			open: false
		}
	}


	render(){
	return(
		<>
		<div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">
      <img src="img_avatar.png" alt="Avatar" style="width:300px;height:300px;">
    </div>
    <div class="flip-card-back">
      <h1>John Doe</h1>
      <p>Architect & Engineer</p>
      <p>We love that guy</p>
    </div>
  </div>
</div>
	);
	}
}

SwiperCard.propTypes = {
  //children: PropTypes.node,
  title: PropTypes.string, 
  path: PropTypes.string
}

SwiperCard.propTypes  = {
   title: '', 
   path: ''
}

export default SwiperCard