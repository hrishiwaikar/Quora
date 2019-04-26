import React, { Component } from 'react';
import { Typography, Modal, Icon, Input } from 'antd';
// import './Credential.css';

import Credential from './Credential';
const { Text, Title } = Typography;


class ProfileCredential extends Component {
    state = {
        visible: false,
        credential: "",
        editCredential: ""
    }

    toggleModal = () => {
        this.setState((state, props) => ({
            visible: !state.visible
        }))
    }

    handleChange = (e) => {
        console.log(e.target.value, this.state.editCredential)
        this.setState({
            editCredential: e.target.value
        })
    }

    handleOk = () => {
        console.log("handleok")
        this.setState((state, props) => ({
            visible: !state.visible,
            credential: state.editCredential
        }))
    }
    render() {
        const { credential, visible, editCredential } = this.state;
        const modalContent =
            <>
                <span><Icon type="user" /> Add profile credential</span>
                <Input placeholder="15 years as a college admission officer" onChange={this.handleChange} value={editCredential} />
            </>

        return (
            <Credential
                modalContent={modalContent}
                credential={credential}
                label="Add Profile Credential"
                toggleModal={this.toggleModal}
                handleOk={this.handleOk}
                visible={visible}
            />
        )
    }
}

export default ProfileCredential;