import React, { Component } from 'react'
import { Typography, Divider, Menu, Row, Col } from 'antd';
import { Route, Switch } from 'react-router-dom'
import './Sidebar.css';
import Profile from './Profile';

const { Title, Text } = Typography;

class Sidebar extends Component {
    state = {
        selected: "profile"
    }
    handleClick = ({ key }) => {
        console.log(key)
        this.setState({
            selected: key
        })
    }
    render() {
        const { selected } = this.state;

        return (
            <div>
                <Row gutter={16}>
                    <Col span={6}>
                        <div className="profile-sidebar">
                            <Title level={4} >Feeds</Title>
                            <Divider />
                            <Menu
                                onClick={this.handleClick}
                                defaultSelectedKeys={[selected]}
                                mode="inline"
                            >
                                <Menu.Item key="profile">Profile</Menu.Item>
                                <Menu.Item key="answers">Answers</Menu.Item>
                                <Menu.Item key="questions">Questions</Menu.Item>
                                <Menu.Item key="followers">Followers</Menu.Item>
                                <Menu.Item key="following">Following</Menu.Item>
                                <Menu.Item key="activity">Activity</Menu.Item>
                            </Menu>
                        </div>
                    </Col>
                    <Col span={18}>
                        <div className="profile-sidebar-content">
                        <Title level={4} >{selected}</Title>
                        <Divider />
                        <Switch>
                            <Route path="/" component={Profile} />
                        </Switch>
                        </div>
                    </Col>
                </Row>
                <div>

                </div>
            </div>
        )
    }
}

export default Sidebar;
