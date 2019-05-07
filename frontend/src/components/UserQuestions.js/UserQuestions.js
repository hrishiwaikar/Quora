import React, { Component } from 'react'
import { call } from '../../api'
import { TestDisplayQuestion } from '../DisplayQuestion/DisplayQuestion';


class UserQuestions extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        const userId = localStorage.getItem("userId")
        call({
            method: 'get',
            url: `/user/${userId}/questions`
        })
            .then(response => {

                console.log(response)
                this.setState({
                    data: response.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        const { data } = this.state;
        return (
            <div>
                <TestDisplayQuestion data={data}/>
      </div>
        )
    }
}

export default UserQuestions;