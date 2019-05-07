import React, { Component } from 'react';
import { Row, Col, Menu, Icon, Card, Typography, Avatar, Button, Tabs } from 'antd';
import './Topic.css';
import { call } from '../../api';
import BottomScrollListener from 'react-bottom-scroll-listener';
import { TestDisplayQuestion } from '../DisplayQuestion/DisplayQuestion';
const { Title, Text } = Typography;
const TabPane = Tabs.TabPane;



class Topic extends Component {
    state = {
        questions: [],
        feed: [],
        pageNumber: 1,
        allDataFetched: false
    };

    setData = () => {
        let { data, allDataFetched, pageNumber } = this.state;

        call({
            method: 'get',
            url: `/userfeeds?page=${pageNumber}`
        })
            .then(response => {
                console.log(response)
                response = response.data
                if (response.length === 0) {
                    allDataFetched = true
                    this.setState({
                        allDataFetched
                    })
                } else {

                    data = data.slice(0)
                    console.log(response)
                    pageNumber += 1;
                    Array.prototype.push.apply(data, response);
                    console.log(data)
                    this.setState({
                        data,
                        pageNumber,
                        allDataFetched
                    })
                }

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
        const { allDataFetched } = this.state;
        if (!allDataFetched)
            this.setData()
        console.log("botton")
    }
    handleFollowClick = () => {
        const topicId = this.props.match.params.id;
        console.log(topicId)
    }

    onTabChange = (key) => {
        console.log(key)
    }
    render = () => {
        const { data } = this.state;
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
            <div className="topic">
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
            </div>
        );
    };
}


export default Topic;