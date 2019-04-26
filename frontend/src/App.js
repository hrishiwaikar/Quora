import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
