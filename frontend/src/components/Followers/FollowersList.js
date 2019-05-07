import React, { Component } from 'react'
import { Card, Icon, Avatar, Row, Col } from 'antd';

import FollowerCard from './FollowerCard';
const { Meta } = Card;



class FollowersList extends Component {
    render() {
        const { data, handleFollowClick } = this.props;
     

        let followers = data.map(d => {
            const { noOfFollowers, profileImage, name, profileCredential, followingBack, _id } = d;
            return <Col span={12} key={_id}>
                <FollowerCard
                    _id={_id}
                    noOfFollowers={noOfFollowers}
                    profileImage={profileImage}
                    name={name}
                    profileCredential={profileCredential}
                    followingBack={followingBack}
                    handleFollowClick={handleFollowClick}
                />
            </Col>
        })
        return (
            <div>
                <Row gutter={8}>
                    {followers}
                </Row>

            </div>
        )
    }
}

export default FollowersList;