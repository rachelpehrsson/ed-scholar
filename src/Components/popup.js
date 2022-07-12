import PropTypes from "prop-types";
//import './fonts.css'
import React, {Component} from "react";

class PopUp extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			open: false
		}
	}


	render(){

		const off=()=> {
  			document.getElementById("overlay").style.display = "none";
		}

		return(
			<>
			<div id="overlay" className = {(this.props.initialShow?"initial":"general")}>
				<div className = "content">
				<div className="header-bar">
					<span onClick = {off}>X</span>
				</div>
				<div className="text" dangerouslySetInnerHTML={{__html:this.props.innerText}}>
				</div>
				</div>
			</div>
			</>
		);
	}
}

PopUp.propTypes = {
  innerText: PropTypes.string,
  initialShow: PropTypes.bool
}

export default PopUp