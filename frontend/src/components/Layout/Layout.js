import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import './Layout.css';

import Home from '../home/home';
import ProfileLayout from '../Profile/ProfileLayout';


class Layout extends Component {
    state = {

    };

    render = () => {

        return (
            <div>

                <Navbar />
                <div className="content">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/profile" component={ProfileLayout} />
                    </Switch>
                </div>

            </div>
        );
    };
}


export default Layout;