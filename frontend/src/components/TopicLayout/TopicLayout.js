import React, { Component } from 'react';
import { Row, Col, Menu, Icon, Card, Typography, Avatar, Button, Tabs } from 'antd';
import './TopicLayout.css';
import { call } from '../../api';
import BottomScrollListener from 'react-bottom-scroll-listener';
import { TestDisplayQuestion } from '../DisplayQuestion/DisplayQuestion';
const { Title, Text } = Typography;
const TabPane = Tabs.TabPane;



class TopicLayout extends Component {
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
    handleFollowClick = () => {
        const topicId= this.props.match.params.id;
            console.log(topicId)
    }

    onTabChange = (key) => {
        console.log(key)
    }
    render = () => {
        const { data } = this.state;
        let userId = localStorage.getItem("userId")
        console.log(data)
        const cardContent = <div>
            <Row gutter={24}>
                <Col span={6}>
                    <img alt="" style={{ width: "100%" }} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                </Col>
                <Col span={18}>
                    < Title level={2}> Bhaskar Gurram</Title>
                    <Button icon="check" type="primary" ghost onClick={this.handleFollowClick}>Follow</Button>
                </Col>
            </Row>


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
                            <Tabs defaultActiveKey="read" onChange={this.onTabChange}>
                                <TabPane tab="Read" key="read">
                                    <TestDisplayQuestion data={data} />
                                    <BottomScrollListener onBottom={this.handleScrollToBottom} />
                                </TabPane>
                                <TabPane tab="Answer" key="answer">
                                    <TestDisplayQuestion data={data} />
                                    <BottomScrollListener onBottom={this.handleScrollToBottom} />
                                </TabPane>
                            </Tabs>,

                        </Card>

                    </Col>
                </Row>
            </div>
        );
    };
}


export default TopicLayout;