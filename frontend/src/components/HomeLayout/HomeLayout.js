import React, { Component } from 'react';
import { Row, Col, Menu, Icon, Card, Typography, Avatar } from 'antd';
import { Switch, Route } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import './HomeLayout.css';
import { call } from '../../api';
import BottomScrollListener from 'react-bottom-scroll-listener';
import { TestDisplayQuestion } from '../DisplayQuestion/DisplayQuestion';

import Topic from '../Topic/Topic';
import Bookmarks from '../Bookmarks/Bookmarks';
import Feed from '../Feed/Feed';
const { Title, Text } = Typography;




class HomeLayout extends Component {
    state = {
        selected: "feed",
        topics: []
    };
    componentDidMount() {
        let userId = localStorage.getItem("userId");
        call({
            method: "get",
            url: `/users/${userId}`
        })
            .then(response => {
                console.log(response)
                this.setState({
                    topics: response.user.topic
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleClick = ({ key }) => {
        this.setState({
            selected: key
        })
        if (key === "bookmarks") {
            return this.props.history.push('/bookmarks')
        } else if (key !== "feed") {
            return this.props.history.push(`/topic/${key}`)
        } else {
            return this.props.history.push("/")
        }
    }

    render = () => {
        const { data, topics } = this.state;
        console.log(data)
        return (
            <div className="home">
                <Row gutter={16}>
                    <Col span={5}>
                        <Menu
                            onClick={this.handleClick}
                            defaultSelectedKeys={["feed"]}
                            mode="inline"
                        >
                            <Menu.Item key="feed"><Icon type="idcard" /> Feed</Menu.Item>
                            {
                                topics.map(topic => (
                                    <Menu.Item key={topic.topicId}><Icon type="user" /> {topic.topicText}</Menu.Item>
                                ))
                            }
                            <Menu.Item key="bookmarks"><Icon type="book" /> Bookmarks</Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={14}>
                        <Switch>
                            <Route path="/bookmarks" component={Bookmarks} />
                            <Route path="/topic/:id" component={Topic} />
                            <Route path="/" component={Feed} />
                        </Switch>

                    </Col>
                </Row>
            </div>
        );
    };
}


export default HomeLayout;