import React, { Component } from 'react';
import { Menu, Icon, Input, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import logo from '../../assets/quora-logo.png';
import './Navbar.css';
import Search from './../Search/Search.js';
import URL from '../../constants';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Navbar extends Component {
    state = {
        current: 'home',
    }

    handleClick = ({ key }) => {
        const { history } = this.props;
        this.setState({
            current: key,
        });
        let url = "";

        let modal = false;
        if (key === "messages") modal = true;

        if (key === "profile")
            url = "profile/123" // insert _id here
        else if (key !== "home")
            url = key
        history.push({
            pathname: `/${url}`,
            state: { modal }
        });

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
                    <SubMenu title={<span className="submenu-title-wrapper"><Icon type="bell" />Notification</span>}>
                        <MenuItemGroup >
                            <Menu.Item key="1">Profile</Menu.Item>
                            <Menu.Item key="2">Messages</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                    <Menu.Item className="navbar-search" disabled>
                        <Search />
                    </Menu.Item>
                    <SubMenu title={<span className="submenu-title-wrapper">
                        <img src={logo} className="navbar-profile" alt="profile" /></span>}>
                        <MenuItemGroup >
                            <Menu.Item key="profile">Profile</Menu.Item>
                            <Menu.Item key="messages">Messages</Menu.Item>
                            <Menu.Item key="content">Your Content</Menu.Item>
                            <Menu.Item key="stats">Stats</Menu.Item>
                            <Menu.Item key="settings">Logout</Menu.Item>
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
