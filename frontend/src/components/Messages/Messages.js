import React, { Component } from 'react'
import { Modal, Typography, Button, List, Avatar } from 'antd';
import "./Messages.css";

const { Title, Text } = Typography;


const data = [
    {
        conversationId: "1",
        name: "Atul",
        profileImage: null,
        conversation: "Hi how are you",
        user_id: "5"
    },
    {
        conversationId: "2",
        name: "Vinit",
        profileImage: null,
        conversation: "Hi how are you",
        user_id: "4"

    }
]


class Messages extends Component {
    state = {
        visible: true,
        conversations: []
    }

    componentDidMount() {
        let conversations = [
            {
                "conversationId": "cf4ea4f0-689e-11e9-9e34-9359aaab8776",
                "messages": 1,
                "updatedAt": "2019-04-27T03:44:50.377Z",
                "createdAt": "2019-04-27T03:44:50.377Z",
                "lastMessage": {
                    "_id": "5cc3d032ad84ffdb66328d88",
                    "from": "a1640220-6802-11e9-8e1a-bd176bf67daa",
                    "to": "221cf8c0-6805-11e9-b14f-67ed4350d048",
                    "message": "Hello Hrishi! Messaging is almost complete",
                    "createdAt": "2019-04-27T03:44:50.385Z"
                },
                "conversationWith": {
                    "_id": "5cc2ce5eb4828a7648c923de",
                    "firstName": "Hrishikesh",
                    "lastName": "Waiker",
                    "userId": "221cf8c0-6805-11e9-b14f-67ed4350d048"
                }
            },
            {
                "conversationId": "24427060-687f-11e9-820f-d16c50b9ab48",
                "messages": 3,
                "updatedAt": "2019-04-26T23:58:09.013Z",
                "createdAt": "2019-04-26T23:58:09.013Z",
                "lastMessage": {
                    "_id": "5cc3a331b3fefeb598dd2df4",
                    "from": "e1a21570-6802-11e9-935c-855a9a513e79",
                    "to": "a1640220-6802-11e9-8e1a-bd176bf67daa",
                    "message": "Hello Vinit! Good to be on Quora",
                    "createdAt": "2019-04-27T00:32:49.736Z"
                },
                "conversationWith": {
                    "_id": "5cc2ca970af70273be9242b0",
                    "firstName": "Tosha",
                    "lastName": "Kamath",
                    "userId": "e1a21570-6802-11e9-935c-855a9a513e79"
                }
            }
        ]
        conversations = conversations.map(conversation => ({
            conversationId: conversation.conversationId,
            name: conversation.conversationWith.firstName + " " + conversation.conversationWith.lastName,
            conversation: conversation.lastMessage.message,
            user_id: conversation.conversationWith.userId
        }))
        this.setState({
            conversations
        })
    }

    handleCancel = () => {
        this.props.goBack();
    }

    handleOk = () => {

    }
    handleNewMessage = () => {
        console.log("new message")
        this.props.push({
            pathname: "/messages/new",
            state: {
                modal: true
            }
        })
    }

    handleMessageClick = (conversationId) => {
        console.log(conversationId)
        this.props.push({
            pathname: `/messages/thread/${conversationId}`,
            state: {
                modal: true
            }
        })
    }

    handleCancel = () => {
        this.props.goBack();
    }


    render() {
        const { visible, conversations } = this.state;
        return (
            <div >
                <Modal
                    className="messages-modal"
                    style={{ top: 20 }}
                    title={<Title level={4}>Messages</Title>}
                    visible={visible}
                    //             onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>Return</Button>,
                        <Button key="submit" type="primary" onClick={this.handleNewMessage}>
                            New Message
                        </Button>,
                    ]}

                >
                    <List

                        itemLayout="horizontal"
                        dataSource={conversations}
                        renderItem={item => (
                            <List.Item className="list-item" onClick={() => this.handleMessageClick(item.conversationId)}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.userId} />}
                                    title={<a >{item.name}</a>}
                                    description={item.conversation}
                                />
                            </List.Item>
                        )}
                    />
                </Modal>
            </div>
        )
    }
}

export default Messages;