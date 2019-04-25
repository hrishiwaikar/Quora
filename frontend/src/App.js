import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/home/home';
import Authentication from './components/Authentication/Authentication';
import PrivateRoute from './components/common/PrivateRoute';


class App extends Component {
  render = () => {

    return (
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Authentication} />
        </Switch>
      </Router>
    )
  }
}

export default App;
