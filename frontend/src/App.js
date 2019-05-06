import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import "antd/dist/antd.css";
import Layout from './components/Layout/Layout';
import Authentication from './components/Authentication/Authentication';


class App extends Component {
  render = () => {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Authentication} />
          <Route path="/" component={Layout} />
        </Switch>
      </Router>
    );
  };
}

export default App;
