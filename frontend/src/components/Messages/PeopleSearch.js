import React, { Component } from 'react'
import { Input, List, Avatar, Icon, Typography } from 'antd';

import "./PeopleSearch.css"

const { Text } = Typography;

class PeopleSearch extends Component {
    state = {
        loading: false,
        data: [],
        user: null
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            loading: true
        })

        const data = [
        {
            "firstName": "Hrishikesh",
            "lastName": "Waiker",
            "userId": "221cf8c0-6805-11e9-b14f-67ed4350d048",
            "followers": 1
        },
        {
            "firstName": "vinit",
            "lastName": "dholakia",
            "userId": "d4b272d0-6814-11e9-b339-05da8f0f9c12",
            "displayId": "vinit-dholakia-1"
        },
        {
            "firstName": "atul",
            "lastName": "gutal",
            "userId": "d2c752f0-6888-11e9-8d07-f1003021cb4d",
            "displayId": "atul-gutal"
        }
    ]
        setTimeout(() => {
            this.setState({
                loading: false,
                data
            })
        }, 1000)
    }

    handleClick = (item) => {
        const { handleClick } = this.props;
        this.setState({
            data: [],
            user: item
        })
        handleClick(item.userId)
    }

    handleClearSelection = () => {
        this.setState({
            user: null
        })
    }

    render() {
        const { loading, data, user } = this.state;

        return (
            <div className="people-search">
                {
                    user ?
                        <>
                            <Avatar src={user.userId} /> 
                            <Text>{user.firstName + " " + user.lastName} </Text>
                            <a onClick={this.handleClearSelection}> Change </a>
                        </>
                        :
                        <Input type="text"
                            onChange={this.handleChange}

                        />
                }
                {loading ? <Icon type="loading" /> : null}
                {
                    data.length > 0 ?
                        <List

                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <List.Item className="list-item" onClick={() => this.handleClick(item)}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.userId} />}
                                        title={<a >{item.firstName + " " + item.lastName} </a>}
                                        description={"description"}
                                    />
                                </List.Item>
                            )}
                        /> :
                        null
                }

            </div>
        )
    }
}

export default PeopleSearch;