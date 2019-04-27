import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import './Layout.css';

import HomeLayout from '../HomeLayout/HomeLayout';
import ProfileLayout from '../ProfileLayout/ProfileLayout';
import AnswerLayout from '../AnswerLayout/AnswerLayout';
import Messages from '../Messages/Messages';
import NewMessage from '../Messages/NewMessage';
import Thread from '../Messages/Thread';

class Layout extends Component {
    previousLocation = this.props.location;

    componentWillUpdate(nextProps) {
        let { location } = this.props;

        // set previousLocation if props.location is not modal
        if (
            nextProps.history.action !== "POP" &&
            (!location.state || !location.state.modal)
        ) {
            this.previousLocation = this.props.location;
        }
    }


    render = () => {
        let { location } = this.props;

        let isModal = !!(
            location.state &&
            location.state.modal &&
            this.previousLocation !== location
        ); 
        return (
            <div>

                <Navbar />
                <div className="content">
                    <Switch location={isModal ? this.previousLocation : location}>
                        <Route path="/profile" component={ProfileLayout} />
                        <Route path="/answer" component={AnswerLayout} />
                        <Route path="/" exact component={HomeLayout} />
                    </Switch>
                    {isModal ?
                        <>
                            <Switch>
                                <Route path="/messages/new" component={NewMessage} />
                                <Route path="/messages/thread/:id" component={Thread} />
                                <Route path="/messages" component={Messages} />
                            </Switch>
                        </>
                        :
                        null}
                </div>

            </div>
        );
    };
}


export default Layout;