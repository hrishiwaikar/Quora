import React, { Component } from 'react';
import { Icon, Input, Row, Col, Typography, Form, Select, Checkbox } from 'antd';

import CredentialModal from './CredentialModal';

const { Text, Title } = Typography;
const { Option } = Select;

class LocationCredential extends Component {
    constructor(props) {
        super(props)
        let editLocation = {
            location: "",
            startYear: "",
            endYear: "",
            current: false,
            ...props.location
        }
        this.state = {
            visible: props.visible,
            hideText: props.hideText,
            location: props.location || {},
            editLocation,
            userId: props.userId
        }
    }

    toggleModal = () => {
        const { toggleModal } = this.props;
        if (toggleModal) {
            toggleModal("addLocationModal")
        }
        this.setState((state, props) => ({
            visible: !state.visible
        }))
    }


    handleOk = () => {
        console.log("handleok")
        const { handleAdd } = this.props;
        if (handleAdd) {
            handleAdd(this.state.editLocation)
        }
        this.setState((state, props) => ({
            visible: !state.visible,
            location: { ...state.editLocation }
        }))
    }

    handleChange = (e, type) => {
        console.log(e, type)
        let name, value;
        if (e.target) {
            name = e.target.name;
            if (e.target.value !== undefined) {
                value = e.target.value
            } else if (e.target.checked !== undefined) {
                value = e.target.checked
            }
        }
        else {
            name = type;
            value = e
        }
        console.log(name, value)
        this.setState((state) => {
            let editLocation = state.editLocation;
            editLocation[name] = value;
            return {
                editLocation
            }
        })
    }
    render() {
        const { visible, location, editLocation, hideText, userId } = this.state;
        const { startYear, endYear, current } = location;
        let currentLocation = location.location;
        var options = [];
        for (var i = 2019; i > 1900; i--) {
            options.push(<Option value={i} key={i}>{i}</Option>)
        }
        return (
            <>
                <div className="credential">
                    {
                        !hideText ?
                            currentLocation ?
                                <div>
                                    <Icon type="pushpin" />
                                    <Title level={4}>{currentLocation}</Title>
                                    {
                                        userId === localStorage.getItem("userId") ?
                                            <Text type="secondary" onClick={this.toggleModal} className="edit">Edit</Text> : null
                                    }
                                </div>
                                :
                                <div className="title">
                                    <Icon type="idcard" />
                                    <span onClick={this.toggleModal}>Add Location Credential</span>
                                </div> : null
                    }

                </div>
                <CredentialModal toggleModal={this.toggleModal} handleOk={this.handleOk} visible={visible}>
                    <div>
                        <span><Icon type="idcard" /> Add Location credential</span>
                        <Form.Item>

                            <Row gutter={8}>
                                <Col span={6}><Text>location</Text></Col>
                                <Col span={18}><Input placeholder="San Jose" onChange={this.handleChange} name="location" value={editLocation.location} /></Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Row gutter={8}>
                                <Col span={6}><Text>Start Year</Text></Col>
                                <Col span={18}>
                                    <Select defaultValue="lucy" style={{ width: 120 }} name="startYear" value={editLocation.startYear} onChange={(e) => this.handleChange(e, "startYear")}>
                                        {
                                            options
                                        }
                                    </Select>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Row gutter={8}>
                                <Col span={6}><Text>End Year</Text></Col>
                                <Col span={18}>
                                    <Select defaultValue="lucy" style={{ width: 120 }} name="endYear" value={editLocation.endYear} onChange={(e) => this.handleChange(e, "endYear")}>
                                        {
                                            options
                                        }
                                    </Select>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Row gutter={8}>
                                <Col span={6}><Text>I currenty live here</Text></Col>
                                <Col span={18}>
                                    <Checkbox
                                        checked={editLocation.current}
                                        name="current"
                                        onChange={this.handleChange}
                                    >
                                        Current
                                    </Checkbox>
                                </Col>
                            </Row>
                        </Form.Item>
                    </div>
                </CredentialModal>
            </>
        )


    }
}

export default LocationCredential;