import React, { Component }  from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes,Route,Navigate,Link} from "react-router-dom";
import Swipe from "./Components/Swipe";
import LandingPage from "./Components/landing-page"
import ArticlePage from "./Components/articlepage"
import Navbar from "./Components/navbar"
//element={<Swipe />} render={(props) => <ArticlePage {...props}/>}

function App() {
  return (

    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
          <Route path="/" component={LandingPage}  element={<LandingPage />} />
          <Route path="/swipe" component={Swipe}  element={<Swipe />} />
          <Route path="/articlepage" component={ArticlePage} element={<ArticlePage />}  />
          </Routes>
          <Navbar />
      </Router>

      </header>
    </div>

  );
}

export default App;
