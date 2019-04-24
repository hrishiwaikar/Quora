import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/home/home.js';
import QuestionPage from './components/questions/question_page.js';

class App extends Component {
  render = () => {

    return (
      <Router>
        <div>

          <Route exact path="/" component={Home} />
          <Route path="/question" component={QuestionPage} />
        </div>
      </Router>
    )
  }
}

export default App;
