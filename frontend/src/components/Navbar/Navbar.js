import React, { Component } from 'react';
import { Menu, Icon, Input, Button } from 'antd';
import logo from '../../assets/quora-logo.png';
import './Navbar.css';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Navbar extends Component {
    state = {
        current: 'home',
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (
            <div className="navbar">

                <img src={logo} className="logo" />

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
                    <Menu.Item key="spaces">
                        <Icon type="team" />Spaces
                        </Menu.Item>
                    <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />Notification</span>}>
                        <MenuItemGroup >
                            <Menu.Item key="setting:1">Option 1</Menu.Item>
                            <Menu.Item key="setting:2">Option 2</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                    <Menu.Item className="navbar-search" disabled>
                        <Input
                            placeholder="Search Quora"
                            prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />
                    </Menu.Item>
                    <SubMenu title={<span className="submenu-title-wrapper">
                        <img src={logo} className="navbar-profile" /></span>}>
                        <MenuItemGroup >
                            <Menu.Item key="setting:1">Option 1</Menu.Item>
                            <Menu.Item key="setting:2">Option 2</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                    <Menu.Item className="navbar-button" disabled>
                        <Button type="primary">Primary</Button>
                    </Menu.Item>


                </Menu>
            </div>

        );
    }
}

export default Navbar;