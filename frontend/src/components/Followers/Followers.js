import React, { Component } from 'react'
import { Col, Row, Skeleton } from 'antd';
import FollowerCard from './FollowerCard';
// import FollowersList from './FollowersList';
import { call } from '../../api';

class Followers extends Component {

  state = {
    followers: [],
    loading: true
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    call({
      method: "get",
      url: `/users/${userId}/followers`
    })
      .then(data => {
        console.log(data)
        const followers = data.followers;
        this.setState({
          followers,
          loading: false
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  setFollowers = (followers, userId) => {
    console.log(followers, userId)
    followers = followers.map(follower => {
      if (follower.userId === userId) {
        if (follower.followingBack) {
          follower.followers -= 1
        } else {
          follower.followers += 1
        }
        follower.followingBack = !follower.followingBack
      }
      return follower;
    });
    console.log(followers)
    this.setState({
      followers
    })
  }
  handleFollowClick = (userId) => {
    console.log(userId)
    let { followers } = this.state;
    let follower = followers.filter(follower => follower.userId === userId)[0]
    if (!follower.followingBack) {
      call({
        method: 'post',
        url: `/follow/${userId}`
      })
        .then(data => {
          console.log(data)
          this.setFollowers(followers, userId);
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      call({
        method: 'post',
        url: `/unfollow/${userId}`
      })
        .then(data => {
          console.log(data)
          this.setFollowers(followers);
        })
        .catch(err => {
          console.log(err)
        })
    }


  }
  render() {
    let { followers, loading } = this.state;
    console.log(followers)
    followers = followers.map(d => {
      const { followers, profileImage, firstName, lastName, profileCredential, followingBack, _id,userId } = d;
      return <Col span={12} key={_id}>
        <FollowerCard
          _id={_id}
          userId={userId}
          noOfFollowers={followers}
          profileImage={profileImage}
          name={firstName + " " + lastName}
          profileCredential={profileCredential}
          followText={followingBack ? "Following" : "Follow"}
          handleFollowClick={this.handleFollowClick}
        />
      </Col>
    })
    return (
      <div>
        <Row gutter={8}>
          {
            loading ?
              <Skeleton active /> :
              followers
          }

        </Row>
        {/* <FollowersList data={followers} handleFollowClick={this.handleFollowClick} /> */}
      </div>
    )
  }
}

export default Followers;