import React, { Component } from 'react'
import { Row, Col, Typography, Divider } from 'antd';
import './ProfileLayout.css';

import Image from './Image';
import Name from './Name';
import ProfileCredential from './ProfileCredential';
import Description from './Description';
import FollowerCount from './FollowerCount';
import CredentialAndHighlights from './CredentialAndHighlights';
import KnowsAbout from './KnowsAbout';
import Sidebar from './Sidebar';

class Profile extends Component {
    render() {
        return (
            <div className="profile-layout">

            <Row gutter={8}>
                <Col span={18}>
                    <Row gutter={24}>
                        <Col span={5}>
                            <Image />
                        </Col>
                        <Col span={19}>
                            <Name />
                            <ProfileCredential />
                            <Description />
                            <FollowerCount numberOfFollowers={18}/>
                        </Col>
                    </Row>
                    <Row>
                        <Divider />
                    </Row>
                    <Sidebar />
                </Col>
                <Col span={6}>
                    <Row>
                        <CredentialAndHighlights />
                    </Row>
                    <Row>
                        <KnowsAbout />
                    </Row>
                </Col>
            </Row>
            </div>


        )
    }
}

export default Profile;
