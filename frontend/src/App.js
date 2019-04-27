import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import "antd/dist/antd.css";
import Layout from './components/Layout/Layout';
import Authentication from './components/Authentication/Authentication';



class App extends Component {
  render = () => {

    return (
      <Router>
        <>
          <Route path="/" component={Layout} />
          <Route path="/login" component={Authentication} />
        </>
      </Router>
    )
  }
}

export default App;
