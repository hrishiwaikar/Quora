import React, { Component } from 'react'
import { Modal, Typography, Button, List, Avatar, Input, Icon } from 'antd';
import "./NewMessage.css";
import PeopleSearch from './PeopleSearch';
const { TextArea } = Input;


const { Title, Text } = Typography;

class Message extends Component {
    state = {
        visible: true,
        to: "",
        message: "",
        data: [
            {
                _id: "1",
                name: "Bhaskar Gurram",
                profileImage: null,

            }
        ]
    }



    handleCancel = () => {
        this.props.history.go(-2);
    }
    handleBack = () => {
        this.props.history.goBack();
    }
    handleChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    handleSendMessage = () => {
        const { message, to } = this.state;

        console.log(message, to)
    }

    hanldeClick = (_id) => {
        console.log(_id)
        this.state.to = _id;
    }

    render() {
        const { visible, message } = this.state;
        return (
            <div >
                <Modal
                    className="messages-modal new-message-modal"
                    style={{ top: 20 }}
                    title={
                        <div className="thread-title">
                            <Icon type="left" onClick={this.handleBack} />
                            <Title level={4}>New Message </Title>
                        </div>}
                    visible={visible}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleBack}>back</Button>,
                        <Button key="submit" type="primary" onClick={this.handleSendMessage}>
                            Send
                        </Button>,
                    ]}

                >
                    <PeopleSearch
                        handleClick={this.hanldeClick}
                    />
                    <TextArea rows={7} onChange={this.handleChange} value={message} />

                </Modal>
            </div>
        )
    }
}

export default Message;