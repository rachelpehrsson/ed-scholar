import PropTypes from "prop-types"
//import './fonts.css'
import React, {Component, useState} from "react"
//import Image from '../components/image.js';
import SwiperCard from "./swiper-card"
import { useSwipeable } from "react-swipeable";
import {Navigate, useNavigate} from "react-router-dom";

const ArticleSwiper =()=>{
	
const swipercards = [["Frozen Dreams", 
			"https://action.scholastic.com/content/dam/classroom-magazines/action/issues/2020-2021/020121/frozen-dreams/ACT-05-020121-p08-NF-MHenson-HR.jpg", 
			"Matthew Henson was about to reach the North Pole. Suddenly, the ice beneath his feet cracked. What happened to Henson?",
			"https://action.scholastic.com/issues/2020-21/020121/frozen-dreams.html#700L-800L", 
			"It was April 3, 1909. An American explorer named Matthew Henson was walking across the ice-covered Arctic Ocean. This was a frozen wilderness—where no person could survive for long. Even polar bears stayed away."
			+"But Henson was excited. He knew he was just days from achieving his dream. He wanted to be one of the first people to reach the North Pole." 
+"Henson put his head down and pushed forward against the wind. Suddenly, he lost his balance. The ice beneath his feet cracked. He fell into the frigid ocean. "

   +" Henson had spent nearly 20 years of his life trying to get to the North Pole. "

   +" And now it seemed it would all end right here."], 
			["Scream Machine", 
			"https://action.scholastic.com/content/dam/classroom-magazines/action/issues/2021-2022/050122/scream-machines-the-thrill-engineer/ACT-08-050122-PT-CoasterOpener-HR.jpg",
			"Can you brave the history of these death-defying rides?",],
			]
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
    onSwipedUp: () => componentWillMount(swipercards[activeIndex][3])
});

	const navigate = useNavigate();

	const componentWillMount=(url)=> {
		//alert("this will show the text");
		navigate("/articlepage", {state: { text: swipercards[activeIndex][4], title: swipercards[activeIndex][0] }});
		return(
			<Navigate
            to={{
            pathname: "/articlepage",
            state: { text: swipercards[activeIndex][5] }
          }}
        />);

    // fetch(url)
    //   .then((response) => {
    //   	console.log(url);
    //   	console.log(response.text());
        // now fetch the text
        //const reader = response.body.getReader();
    		// 	return new ReadableStream({
      // 		start(controller) {
      //   	return pump();
      //   	function pump() {
      //     	return reader.read().then(({ done, value }) => {
      //       // When no more data needs to be consumed, close the stream
      //       if (done) {
      //         controller.close();
      //         return;
      //       }
      //       // Enqueue the next data chunk into our target stream
      //       controller.enqueue(value);
      //       return pump();
      //     });
      //   }
      // }
   			//  });
      // });
  //     .then(stream => new Response(stream))
  // // Create an object URL for the response
  // .then(response => response.blob())
  // .then(blob => URL.createObjectURL(blob))
  // // Update image
  // .then(url => console.log(url))
  // .catch(err => console.error(err));
  }

const renderCard=(i)=> {
		return(
		<SwiperCard
			title = {swipercards[i][0]}
			path = {swipercards[i][1]}
			previewtext = {swipercards[i][2]}
		/>
		);
	}

	var swiperElem = [];
	console.log("rendering");
	console.log(swipercards[0][0]);
	for(let s in swipercards){
			console.log(s);
			swiperElem.push(renderCard(s));

		}

	return(
	 <div className = "swipers" {...handlers}>
		{swiperElem[activeIndex]}
		</div>
	);

}



export default ArticleSwiper