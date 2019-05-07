import React, { Component } from 'react';
import { Row, Col, Menu, Icon, Card, Typography, Avatar } from 'antd';
import './HomeLayout.css';

const { Title, Text } = Typography;



class HomeLayout extends Component {
    state = {
        selected: "feed"
    };
    handleClick = ({ key }) => {
        this.setState({
            selected: key
        })
    }
    render = () => {
        const profileImage = null;
        const avatar = profileImage ? <Avatar size="small" src={profileImage} /> : <Avatar size="small" icon="user" />;
        const cardContent = <div>
            {avatar}
            < Text > Bhaskar Gurram</Text>
            <Title level={3}>What is your question?</Title>
        </div>


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
                            <Menu.Item key="bookmarks"><Icon type="book" /> Bookmarks</Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={14}>
                        <Card className="card"> 
                            {cardContent}
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    };
}


export default HomeLayout;