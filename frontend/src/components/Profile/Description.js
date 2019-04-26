import React, { Component } from 'react'
import { Typography, Input, Button } from 'antd';


import './Description.css';
import App from '../../App';

const { TextArea } = Input;
const { Text, Title } = Typography;

class Description extends Component {
    state = {
        editing: false,
        description: ""
    }

    toggleEditing = () => {
        this.setState((state, props) => ({
            editing: !state.editing
        }))
    }

    handleUpdate = () => {
        this.setState({
            editing: false
        })
    }

    handleChange = (e) => {
        console.log(e.target.value)
        this.setState({
            description: e.target.value
        })
    }

    render() {
        const { editing, description } = this.state;
        return (
            <div className="description">

                {
                    editing ?
                        <>
                            <TextArea rows={4} onChange={this.handleChange} value={description}/>
                            <div className="description-buttons-div">
                                <Text type="secondary" onClick={this.toggleEditing} >Cancel</Text>
                                <Button type="primary" onClick={this.handleUpdate} >Update</Button>
                            </div>
                        </>
                        :
                        <div className="edit-description">
                            {
                                description ?
                                    <div>
                                        <Title level={4}>{description}</Title> 
                                        <Text underline type="secondary"  onClick={this.toggleEditing} className="edit">Edit</Text>
                                    </div>
                                    
                                    :
                                    <Text type="secondary" onClick={this.toggleEditing} >Write a description about yourself</Text>
                            }
                        </div>
                }

            </div>
        )
    }
}

export default Description;
