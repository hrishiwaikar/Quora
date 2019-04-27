import React, { Component } from 'react'
import { Card, Icon, Avatar, Button } from 'antd';
import { withRouter } from 'react-router-dom';

const { Meta } = Card;

class FollowCard extends Component {
    handleClick = () => {
        const { _id, history } = this.props;
        history.push(`/profile/${_id}`);
    }
    render() {
        const { noOfFollowers, profileImage, name, profileCredential, followingBack, handleFollowClick, _id } = this.props;
        const followText = followingBack ? "Following" : "Follow"
        return (
            <div>
                <Card
                    actions={[<Button type="primary" icon="user" ghost disabled={followingBack} onClick={() => handleFollowClick(_id)}>{followText } &nbsp;{noOfFollowers}</Button>]}
                >
                    <Meta
                        avatar={profileImage ? <Avatar src={profileImage} /> : <Avatar icon="uesr" />}
                        title={<a onClick={this.handleClick}>{name}</a>}
                        description={profileCredential}
                    />
                </Card>,
      </div>
        )
    }
}

export default withRouter(FollowCard);