import React, { Component } from 'react';
import { Typography, Modal, Icon, Input } from 'antd';
// import './LocationCredential.css';

import Credential from './Credential';
const { Text, Title } = Typography;


class LocationCredential extends Component {
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
                <span><Icon type="user" /> Add Location credential</span>
                <Input placeholder="Furniture Designer" onChange={this.handleChange} value={editCredential} />
            </>

        return (
            <Credential
                modalContent={modalContent}
                credential={credential}
                icon={<Icon type="pushpin" />}
                label="Add Location Credential"
                toggleModal={this.toggleModal}
                handleOk={this.handleOk}
                visible={visible}
            />
        )
    }
}

export default LocationCredential;