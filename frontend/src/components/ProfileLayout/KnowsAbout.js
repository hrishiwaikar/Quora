import React, { Component } from 'react'
import { Typography, Icon, Divider, Modal, Input, Tag, List, Button } from 'antd';
import './KnowsAbout.css';
import { debounce } from '../../utils';
import { call } from '../../api';

const { Title, Text } = Typography;

class KnowsAbout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            topic: props.topic || [],
            visible: false,
            loading: false,
            data: [],
            value: ""
        }
    }

    debounceChange = debounce((text) => {
        if (text.length > 0) {

            this.setState({
                loading: true
            })
            call({
                method: "get",
                url: `/topics?q=${text}&limit=5`
                // conversations/sendto?q=wef&limit=1&token={{token}}
            })
                .then(data => {
                    console.log(data)
                    data = data.data;
                    console.log(data)
                    this.setState({
                        loading: false,
                        data
                    })
                })
                .catch(err => {
                    console.log(err)
                    this.setState({
                        loading: true
                    })
                })
        }
    }, 300)

    toggleModal = () => {
        this.setState((state) => ({
            visible: !state.visible,
            value: ""
        }));
    }
    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            loading: true,
            value: e.target.value
        })

        const data = [
            {
                "_id": "5cc2ca7c6f38b073bff80bdd",
                "topic": "Elections",
                "experience": "BJP vs Congress"
            }
        ]
        setTimeout(() => {
            this.setState({
                loading: false,
                data
            })
        }, 1000)
    }

    handleClose = (_id) => {
        let userId = localStorage.getItem("userId")
        let { topic } = this.state
        topic = topic.filter(t => t._id !== _id);
        console.log(userId)
        call({
            method: 'put',
            url: `/users/${userId}`,
            data: {
                topic
            }
        })
            .then(data => {
                console.log(data)
                this.setState({
                    topic,
                    value: ""
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleClick = (item) => {
        let userId = localStorage.getItem("userId")
        console.log(userId)

        let { topic } = this.state
        topic.push(item)
        call({
            method: 'put',
            url: `/users/${userId}`,
            data: {
                topic
            }
        })
            .then(data => {
                console.log(data)
                this.setState({
                    topic,
                    data: [],
                    value: ""
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        const { topic, loading, data, visible, value } = this.state;
        return (
            <div className="knows-about">
                <Title level={4}>Knows About</Title>
                <Icon type="edit" onClick={this.toggleModal} />
                <Divider />
                {
                    topic.map(t => (
                        <p>{t.topicText}</p>
                    ))
                }
                <Modal
                    visible={visible}
                    style={{ top: "20px" }}
                    title={
                        <>
                            <Title level={4} className="edit-credentials-title">Edit the topics you know about</Title>
                            <Text type="secondary">Topics are used to find the best experts to answer the question.</Text>
                        </>
                    }
                    footer={[
                        <Button type="primary" onClick={this.toggleModal}>Done</Button>
                    ]}
                    onCancel={this.toggleModal}
                >

                    <Input onChange={(e) => {
                        this.setState({
                            value: e.target.value
                        })
                        this.debounceChange(e.target.value)
                    }} value={value} />
                    {loading ? <Icon type="loading" /> : null}
                    {
                        data.length > 0 ?
                            <List
                                bordered
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item className="list-item" onClick={() => this.handleClick(item)}>
                                        <List.Item.Meta
                                            title={<a >{item.topicText} </a>}
                                        />
                                    </List.Item>
                                )}
                            /> :
                            null
                    }
                    <br />
                    <br />
                    {
                        topic.map(t => (
                            <Tag
                                closable
                                onClose={(e) => {
                                    e.preventDefault();
                                    this.handleClose(t._id);
                                }}
                            >
                                {t.topicText}
                            </Tag>
                        ))
                    }
                </Modal>
            </div>
        )
    }
}

export default KnowsAbout;