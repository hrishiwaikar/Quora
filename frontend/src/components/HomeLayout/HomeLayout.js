import React, { Component } from 'react';
import { Row, Col, Menu, Icon, Card, Typography, Avatar } from 'antd';
import jwtDecode from 'jwt-decode'
import './HomeLayout.css';
import { call } from '../../api';
import BottomScrollListener from 'react-bottom-scroll-listener';
import { TestDisplayQuestion } from '../DisplayQuestion/DisplayQuestion';
import { AskQuestion } from './../AskQuestion/AskQuestion.js';
const { Title, Text } = Typography;




class HomeLayout extends Component {

    state = {
        selected: "feed",
        data: [],
        pageNumber: 1,
        allDataFetched: false,
        topics: ["bhaskar"],
        addQuestion: false
    };

    setData = (pageNumber) => {
        let { data, allDataFetched } = this.state;
        call({
            method: 'get',
            url: `/userfeeds/${pageNumber}`
        })
            .then(response => {
                console.log(response)
                response = response.data
                data = data.slice(0)
                console.log(response)
                if (response.length === 0) allDataFetched = true;
                Array.prototype.push.apply(data, response);
                console.log(data)
                this.setState({
                    data,
                    pageNumber,
                    allDataFetched
                })
            })
            .catch(err => {
                console.log(err)
            })
    }


    componentDidMount() {
        const { pageNumber } = this.state;
        this.setData(pageNumber)
    }

    handleClick = ({ key }) => {
        this.setState({
            selected: key
        })
    }

    handleScrollToBottom = () => {
        const { pageNumber, allDataFetched } = this.state;
        if (!allDataFetched)
            this.setData(pageNumber + 1)
        console.log("botton")
    }


    handleShowAddQuestion = (newQuestionId = null) => {
        console.log('IN SHOW ADD QUESTION');
        this.setState({
            addQuestion: !this.state.addQuestion
        })
        // console.log('New question ', newQuestionId);
        if (newQuestionId !== undefined && newQuestionId !== null) {

            console.log('in ifff ', newQuestionId);

            this.props.history.push('/question/' + newQuestionId);
            window.location.reload();
        }
    }

    render = () => {
        const { data, topics } = this.state;
        console.log(data)
        let userId = localStorage.getItem("userId");
        let userName = localStorage.getItem("userName");
        let profileCredential = localStorage.getItem("profileCredential");

        let profileImage = '/users/' + userId + '/image/';

        let user = localStorage.getItem("user")
        console.log(user)

        const cardContent = <div style={{ padding: 6 }} onClick={() => { this.handleShowAddQuestion() }}>
            <Avatar size="small" src={profileImage} />
            {/* < Text >{`${user.firstName} ${user.lastName}`}</Text> */}
            <Text level={4} className="paddingLeft-s">{userName}</Text>
            <Title level={4} style={{ paddingTop: 0, marginTop: 0, opacity: '0.5', marginBottom: 0 }}>What is your question?</Title>
            <AskQuestion handleShowAddQuestion={this.handleShowAddQuestion} visible={this.state.addQuestion} userId={userId} userName={userName} profileCredential={profileCredential} />
        </div>


        return (
            <div className="home">
                <Row gutter={16}>
                    <Col span={4}>
                        <Menu
                            onClick={this.handleClick}
                            defaultSelectedKeys={["feed"]}
                            mode="inline"
                        >
                            <Menu.Item key="feed"><Icon type="idcard" /> Feed</Menu.Item>
                            {
                                topics.map(topic => (
                                    <Menu.Item key={topic}><Icon type="user" /> {topic}</Menu.Item>
                                ))
                            }
                            <Menu.Item key="bookmarks"><Icon type="book" /> Bookmarks</Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={14}>
                        <Card className="card" bodyStyle={{ padding: 5 }}>
                            {cardContent}
                            <TestDisplayQuestion data={data} />
                            <BottomScrollListener onBottom={this.handleScrollToBottom} />
                        </Card>

                    </Col>
                </Row>
            </div>
        );
    };
}


export default HomeLayout;