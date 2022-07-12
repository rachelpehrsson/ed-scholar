import PropTypes from "prop-types"
//import './fonts.css'
import React, {Component, useState, useEffect} from "react"
//import Image from '../components/image.js';
import SwiperCard from "./swiper-card"
import { useSwipeable } from "react-swipeable";
import {Navigate, useNavigate} from "react-router-dom";
import swipercards from "../article-data";



const ArticleSwiper =()=>{
	
var swiperElem = [];

const [activeIndex,setActiveIndex] = useState(0);	
const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = swipercards.length-1;
    } else if (newIndex >= swipercards.length) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };		

	const handlers = useSwipeable({
   onSwipedLeft: () => updateIndex(activeIndex + 1),
   onSwipedRight: () => updateIndex(activeIndex - 1), 
   onSwipedUp: () => componentWillMount()
});

	const navigate = useNavigate();

	const componentWillMount=()=> {
		//alert("this will show the text");
		navigate("/articlepage", {state: { text: swipercards[activeIndex].pages, title: swipercards[activeIndex].title }});
		return(
			<Navigate
            to={{
            pathname: "/articlepage",
            state: { text: swipercards[activeIndex].pages }
          }}
        />);
  }

  const arrowNavigation = (className)=>{
  	if(className.includes("prev"))
  		updateIndex(activeIndex - 1);
  	else{
  		updateIndex(activeIndex + 1);
  	}
  }

const renderCard=(i)=> {
		return(
		<SwiperCard
			title = {swipercards[i].title}
			path = {swipercards[i].headerimage}
			previewtext = {swipercards[i].previewtext}
			readMoreFunc = {componentWillMount}
			arrowNavFunc = {arrowNavigation}
			key = {i}
		/>
		);
	}

	const renderBar =(active, index)=>{

		let className = active? "bar active":"bar inactive";
		return(
			<span key = {index} className = {className}></span>
		);
	}

	const renderBars=()=>{
		let bars = [];
		for(let s in swipercards){
			//console.log(s+" "+activeIndex);
			let active = (s==activeIndex);
			bars.push(renderBar(active, s));
		}
		return(
			bars
		);
	}

	// if (isLoading) {
 //      return null;
 //    }

 	for(let s in swipercards){
			//console.log(s);

			swiperElem.push(renderCard(s));

		}

	return(
		<div style={{maxWidth:"800px", margin:"auto"}}>
		<div className = "swiper-bar">
			{renderBars()}
		</div>
	 <div className = "swipers" {...handlers}>
		{swiperElem[activeIndex]}
		</div>
		</div>
	
	);

}



export default ArticleSwiper