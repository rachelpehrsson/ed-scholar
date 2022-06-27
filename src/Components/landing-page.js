import React, { Component }  from 'react';
import ArticleWidget from "./article";

const LandingPage = () => {
  return (

    <div className="App">
      <header className="App-header">
        <div class ="nav-bar">
          <div class="page-header">
            Bookstore
          </div>
          <div class ="icons">icons</div>
        </div>
        <input type ="text" class = "search"></input>
      </header>
      <div class ="article-gallery">
      <ArticleWidget
        title = "Frozen Dreams" 
        path = "https://action.scholastic.com/content/dam/classroom-magazines/action/issues/2020-2021/020121/frozen-dreams/ACT-05-020121-p08-NF-MHenson-HR.jpg">
      </ArticleWidget> 
      <ArticleWidget
        title = "Scream Machine" 
        path = "https://action.scholastic.com/content/dam/classroom-magazines/action/issues/2021-2022/050122/scream-machines-the-thrill-engineer/ACT-08-050122-PT-CoasterOpener-HR.jpg">
      </ArticleWidget> 
      </div>
    </div>
  );
}

export default LandingPage;
