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

	console.log("here");
	
	const ColorSection =(color, array)=>{
		console.log(array);
		return(
			<>
			<h2>{color}</h2>
			<ul className="highlight-list">
			{array.map((h) => <li className="highlight-entry">{h}</li>)}
			</ul>
			</>
			);
	}

	const showHighlights =()=>{
		document.getElementById("highlights").style.display = "block";	
	}

	const buildLists=()=>{
		let map = this.props.highlightMap;
		let listArray = [];
		for(let key of map.keys()){
			listArray.push(ColorSection(key, map.get(key)));
		}
		return listArray;
	}

		return(
			<>
			<button className="show-highlights" onClick={showHighlights}>See Your Highlights!</button>
			<div id = "highlights" className ="highlights">
			{buildLists()}
			</div>
			</>
			);
	}
}

HighlighterSelections.propTypes = {
  highlightMap: PropTypes.object
}

export default HighlighterSelections