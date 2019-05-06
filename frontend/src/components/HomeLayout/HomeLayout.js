import React, { Component } from 'react';
import { Row, Col, Menu, Icon, Card, Typography, Avatar } from 'antd';
import './HomeLayout.css';
import { call } from '../../api';
import BottomScrollListener from 'react-bottom-scroll-listener';
import { TestDisplayQuestion } from '../DisplayQuestion/DisplayQuestion';
const { Title, Text } = Typography;




class HomeLayout extends Component {
    state = {
        selected: "feed",
        data: [],
        pageNumber: 1,
        allDataFetched: false
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
    render = () => {
        const { data } = this.state;
        console.log(data)
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