import React, { Component } from 'react'
import FollowersList from './FollowersList';


const data = [
    {
        _id: "1",
        noOfFollowers: 1,
        profileImage: null,
        name: "Bhaskar Gurram",
        profileCredential: "I am human",
        followingBack: true
    },
    {
        _id: "2",
        noOfFollowers: 1,
        profileImage: null,
        name: "Bhaskar Gurram",
        profileCredential: "I am human",
        followingBack: false
    },
    {
        _id: "3",
        noOfFollowers: 1,
        profileImage: null,
        name: "Bhaskar Gurram",
        profileCredential: "I am human",
        followingBack: true
    }
]
class Following extends Component {
    handleFollowClick =(_id) => {
        console.log(_id)
    }
  render() {
    return (
      <div>
        <FollowersList data ={data} handleFollowClick={this.handleFollowClick}/>
      </div>
    )
  }
}

export default Following;