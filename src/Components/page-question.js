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


	render(){

	const checkCorrectness=(e)=>{
			if(this.props.answer){
				if(this.props.answer == e.currentTarget.innerText){
					e.currentTarget.classList.add("correct");
					//call function to show navigation
				}
				else
					e.currentTarget.classList.add("incorrect");
			}
			else{
				e.currentTarget.classList.add("correct");
			}
			submitInput();
	}

	const submitInput=(e)=>{
		this.props.activateNext();
		if(e){
		e.currentTarget.disabled = true;
		e.preventDefault();
		}
	}

	const renderTextInput=(index)=>{
		let inputId = "question"+index;
		return (
			<>
			<form onSubmit={this.handleSubmit}>
			<textarea id = {inputId} type="text" rows="4" className = "option-input" />
			<input type ="submit" className="btn submit" onClick={submitInput} />
			</form>
			</>
		);
	}

	const renderOptionInput=(option)=>{
		return(
				<div className = "option" onClick={checkCorrectness}>{option}</div>
			);
	}

	

	const parseQuestionInput=()=>{
		console.log(this.props.options);
		let optionArray = [];
		if(this.props.options){
			if(this.props.options =="<input></input>"){
				optionArray.push(renderTextInput());
			}
			else{
			for(let o in this.props.options){
				let option = this.props.options[o];
				if(option.includes("input")){
					optionArray.push(renderTextInput(o));
				}
				else{
					optionArray.push(renderOptionInput(option));
				}
			}
		}
	}
		return optionArray;
	}

	return(
		<>
		<div className = "question">
			<div className = "question-text">
				{this.props.text}
			</div>
			<div className = "options">
					{parseQuestionInput()}
			</div>
		</div>
		</>
	);
	}
}

PageQuestion.propTypes = {
  text: PropTypes.string, 
  options: PropTypes.array,
  answer: PropTypes.string,
  activateNext: PropTypes.func
}

export default PageQuestion