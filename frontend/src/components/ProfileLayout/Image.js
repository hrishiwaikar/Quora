import React, { Component } from 'react'
import { Icon, Tooltip, Modal, Upload, message } from 'antd';
import logo from '../../assets/quora-logo.png';
import goku from '../../assets/goku.jpg';
import './Image.css';

const Dragger = Upload.Dragger;
class Image extends Component {
    state = {
        visible: false
    }

    toggleModal = () => {
        this.setState((state, props) => ({
            visible: !state.visible
        }))
    }
    onChange = (info) => {
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            this.setState((state, props) => ({
                visible: !state.visible
            }))
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    render() {
        const { visible } = this.state
        const props = {
            name: 'file',
            multiple: true,
            action: '//jsonplaceholder.typicode.com/posts/',
            onChange: this.onChange
        };
        return (

            <div className="profile-image-container">

                <div className="profile-image-div">
                    <img src={goku} alt="profile" className="profile-image" />
                </div>
                <Tooltip title="Remove this photo" className="profile-image-remove">
                    <Icon type="close" />
                </Tooltip>
                <div className="profile-image-edit">
                    <span onClick={this.toggleModal}>Edit Photo</span>
                </div>
                <Modal
                    visible={visible}
                    footer={null}
                    onCancel={this.toggleModal}
                >
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                    </Dragger>,
                    </Modal>
            </div>
        )
    }
}
export default Image;