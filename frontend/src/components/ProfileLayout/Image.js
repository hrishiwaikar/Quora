import React, { Component } from 'react'
import { Icon, Tooltip, Modal, Upload, message } from 'antd';
import logo from '../../assets/quora-logo.png';
import goku from '../../assets/goku.jpg';
import { call } from '../../api';
import './Image.css';

const Dragger = Upload.Dragger;
class Image extends Component {
    state = {
        visible: false,
        fileList: []
    }

    toggleModal = () => {
        this.setState((state, props) => ({
            visible: !state.visible
        }))
    }
    onChange = (info) => {
        const { fileList } = this.state;
        console.log("hello")
        let userId = localStorage.getItem("userId");
        const formData = new FormData();
      
        formData.append('profileImage', fileList[0]);

        this.setState({
            uploading: true,
        });
        call({
            method: 'put',
            url: `/users/${userId}/image`,
            data: {
                profileImage:  fileList[0]
            }
        })
            .then(response => {
                console.log(response)
                message.success("Profile image updated")
                this.setState({
                    visible: false,
                    fileList: []
                })
            })
            .catch(err => {
                console.log(err)
            })

    }

    render() {
        const { visible, fileList } = this.state
        let userId = localStorage.getItem("userId")

        const props = {
            onRemove: (file) => {
                this.setState((state) => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                console.log(file)
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            onChange: this.onChange,
            multiple: false,
            fileList,
        };
        return (

            <div className="profile-image-container">

                <div className="profile-image-div">
                    <img src={`http://node-lb-1978766301.us-east-2.elb.amazonaws.com/v1/users/${userId}/image`} alt="profile" className="profile-image" />
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