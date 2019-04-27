import React, { Component } from 'react';
import {Icon, Input } from 'antd';
import './EducationCredential.css';

import Credential from './Credential';


class EducationCredential extends Component {
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
                <span><Icon type="user" /> Add Education credential</span>
                <Input placeholder="15 years as a college admission officer" onChange={this.handleChange} value={editCredential} />
            </>

        return (
            <Credential
                modalContent={modalContent}
                credential={credential}
                icon={<Icon type="idcard" />}
                label="Add Education Credential"
                toggleModal={this.toggleModal}
                handleOk={this.handleOk}
                visible={visible}
            />
        )
    }
}

export default EducationCredential;