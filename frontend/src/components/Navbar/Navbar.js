import React, { Component } from 'react';
import { Menu, Icon, Input, Button, List, Popover } from 'antd';
import { withRouter } from 'react-router-dom';
import logo from '../../assets/quora-logo.png';
import './Navbar.css';
import URL from '../../constants';

import Notification from '../Notification/Notification';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Navbar extends Component {
    state = {
        current: 'home',
        visible: false
    }

    handleClick = ({ key }) => {
        const { history } = this.props;
        if (key === "notification") return false;
        const userId = localStorage.getItem("userId");
        if(key === 'logout') {
            localStorage.clear();
            return history.push('/login')
        }
        this.setState({
            current: key,
        });
        let url = "";

        let modal = false
        if (key === "messages") modal = true;

        if (key === "profile")
            url = `profile/${userId}` // insert _id here
        else if (key !== "home")
            url = key
        history.push({
            pathname: `/${url}`,
            state: { modal }
        });

    }

    handleVisibleChange = (visible) => {
        this.setState({ visible });
    }
    render() {
        return (
            <div className="navbar">

                <img src={logo} className="logo" alt="logo" />

                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    style={{ lineHeight: '50px', border: 'none' }}
                >
                    <Menu.Item key="home">
                        <Icon type="book" />Home
                        </Menu.Item>
                    <Menu.Item key="answer">
                        <Icon type="edit" />Answer
                        </Menu.Item>
                    {/* <Menu.Item key="spaces">
                        <Icon type="team" />Spaces
                        </Menu.Item> */}
                    <Menu.Item key="notification">

                        <Popover
                            visible={this.state.visible}
                            onVisibleChange={this.handleVisibleChange}
                            placement="bottom"
                            title="Notifications"
                            content={<Notification handleItemClick={this.handleVisibleChange} />}
                            trigger="click">

                            <Icon type="bell" />Notification

                    </Popover>
                    </Menu.Item>

                    <Menu.Item className="navbar-search" disabled>
                        <Input
                            placeholder="Search Quora"
                            prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />
                    </Menu.Item>
                    <SubMenu title={<span className="submenu-title-wrapper">
                        <img src={logo} className="navbar-profile" alt="profile" /></span>}>
                        <MenuItemGroup >
                            <Menu.Item key="profile">Profile</Menu.Item>
                            <Menu.Item key="messages">Messages</Menu.Item>
                            <Menu.Item key="content">Your Content</Menu.Item>
                            <Menu.Item key="stats">Stats</Menu.Item>
                            <Menu.Item key="logout">Logout</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                    <Menu.Item className="navbar-button" disabled>
                        <Button type="primary">Add Question or Link</Button>
                    </Menu.Item>


                </Menu>
            </div>

        );
    }
}

export default withRouter(Navbar);
