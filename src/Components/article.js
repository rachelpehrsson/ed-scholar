import PropTypes from "prop-types"
//import './fonts.css'
import React, {Component} from "react"
//import Image from '../components/image.js';

class ArticleWidget extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			open: false
		}
	} 
	render(){
	return(
		<div className = "article"/*{'piece ${ this.state.open }'}*/ >
		<div className = "main-image">
		<img src = { this.props.path }/>
		</div>
		<div className = "article-title">
		{ this.props.title }
		</div>
		</div>
	);
	}
}

ArticleWidget.propTypes = {
  //children: PropTypes.node,
  title: PropTypes.string, 
  path: PropTypes.string
}

ArticleWidget.propTypes  = {
   title: '', 
   path: ''
}

export default ArticleWidget