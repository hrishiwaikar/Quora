import React, { Component } from 'react';
import { Row, Col, Card, Typography, Avatar } from 'antd';
import './AnswerLayout.css';

const { Title, Text } = Typography;



class AnswerLayout extends Component {
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