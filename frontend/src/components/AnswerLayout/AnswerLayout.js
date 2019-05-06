import React, { Component } from 'react';
import { Row, Col, Card, Typography, Avatar, Menu, Icon } from 'antd';
import './AnswerLayout.css';
import { call } from '../../api';

const { Title, Text } = Typography;



class AnswerLayout extends Component {
    state = {
        selected: "feed"
    };
    componentDidMount() {
        const userId = localStorage.getItem("userId")
        call({
            method: 'get',
            url: `/user/${userId}/questions`
        })
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
    }

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
                            defaultSelectedKeys={["question"]}
                            mode="inline"
                        >
                            <Menu.Item key="question"><Icon type="idcard" />Questions for you</Menu.Item>
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


export default AnswerLayout;