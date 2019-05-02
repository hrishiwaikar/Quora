import React, { Component } from 'react';
import { Icon, Input } from 'antd';
// import './EmploymentCredential.css';

import Credential from './Credential';

class EmploymentCredential extends Component {
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
                <span><Icon type="user" /> Add Employment credential</span>
                <Input placeholder="Furniture Designer" onChange={this.handleChange} value={editCredential} />
            </>

        return (
            <Credential
                modalContent={modalContent}
                credential={credential}
                icon={<Icon type="mail" />}
                label="Add Employment Credential"
                toggleModal={this.toggleModal}
                handleOk={this.handleOk}
                visible={visible}
            />
        )
    }
}

export default EmploymentCredential;