import React, { Component } from 'react';
import { Typography, Button, Input } from 'antd';

import "./Name.css";
const { Title, Text } = Typography;


class Name extends Component {
    state = {
        editing: false,
        name: "Bhaskar Gurram"
    }
    handleChange = (e) => {

        this.setState({
            name: e.target.value
        })
    }

    toggleEditing = () => {
        this.setState((state, props) => ({
            editing: !state.editing
        }))
    }
    
    handleUpdate = () => {
        this.toggleEditing();
    }

    render() {
        const { editing, name } = this.state;
        return (
            <div className="name">

                {
                    editing ?
                        <>
                            <input onChange={this.handleChange} value={name} />
                            <div className="name-buttons-div">
                                <Text type="secondary" onClick={this.toggleEditing} >Cancel</Text>
                                <Button type="primary" onClick={this.handleUpdate} >Update</Button>
                            </div>
                        </>
                        :
                        <div className="edit-name">
                            {
                                name ?
                                    <div>
                                        <Title level={2}>{name}</Title>
                                        <Text underline type="secondary" onClick={this.toggleEditing} className="edit">Edit</Text>
                                    </div>

                                    :
                                    <Text type="secondary" onClick={this.toggleEditing} >Your name</Text>
                            }
                        </div>
                }

            </div>

        )
    }
}

export default Name;