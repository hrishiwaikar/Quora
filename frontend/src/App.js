import React, { Component } from 'react';
import './App.css';


import "antd/dist/antd.css";
import Layout from './components/Layout/Layout';
import Authentication from './components/Authentication/Authentication';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/home/home";
import Authentication from "./components/Authentication/Authentication";
import PrivateRoute from "./components/common/PrivateRoute";
import Stats from "./components/Stats/Stats";

class App extends Component {
  render = () => {
    return (
      <Router>
        <>
          <Route path="/" component={Layout} />
          <Route path="/login" component={Authentication} />
          <Route path="/stats" component={Stats} />
        </>
      </Router>
    );
  };
}

export default App;
