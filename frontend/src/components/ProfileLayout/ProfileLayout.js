import React, { Component } from 'react'
import { Row, Col, Typography, Divider, Skeleton } from 'antd';
import './ProfileLayout.css';
import { call, get } from '../../api';

import Image from './Image';
import Name from './Name';
import ProfileCredential from './ProfileCredential';
import Description from './Description';
import FollowerCount from './FollowerCount';
import EducationCredential from './EducationCredential';
import EmploymentCredential from './EmploymentCredential';
import LocationCredential from './LocationCredential';
import KnowsAbout from './KnowsAbout';
import Sidebar from './Sidebar';
import CredentialAndHighlights from './CredentialAndHighlights';

const { Text, Title } = Typography;

class Profile extends Component {
    state = {
        user: {},
        loading: true
    }
    componentDidMount() {
        const { match } = this.props;
        console.log(match.params.id)
        // get(`/users/`, match.params.id, (data) => {
        //     console.log(data)
        // }, (err) => {
        //     console.log(err)
        // })
        call({
            method: 'get',
            url: `/users/${match.params.id}`
        })
            .then(data => {
                console.log(data.user)
                this.setState({
                    user: data.user,
                    loading: false
                })
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        const { user, loading } = this.state;
        const {
            firstName,
            lastName,
            profileCredential,
            description,
            followers,
            education,
            location,
            employment,
            topic,
            userId
        } = user;
        return (
            <div className="profile-layout">

                <Row gutter={8}>
                    <Col span={18}>
                        <Row gutter={24}>
                            {
                                !loading ?
                                    <>
                                        <Col span={5}>
                                            <Image />
                                        </Col>
                                        <Col span={19}>
                                            <Name firstName={firstName} lastName={lastName} key={firstName} userId={userId} />
                                            <ProfileCredential profileCredential={profileCredential} key={profileCredential} userId={userId}  />
                                            <Description description={description} key={description} userId={userId} />
                                            <FollowerCount followers={followers} key={followers}/>

                                        </Col>
                                    </>
                                    :
                                    <Skeleton avatar active />
                            }
                        </Row>
                        <Row>
                            <Divider />
                        </Row>
                        <Sidebar />
                    </Col>
                    <Col span={6}>
                        <Row>
                            {
                                !loading ?
                                    <>
                                        <CredentialAndHighlights
                                        userId={userId}
                                            education={education}
                                            employment={employment}
                                            location={location}
                                            profileCredential={profileCredential}
                                            key={education}
                                        />
                                    </>
                                    :
                                    <Skeleton active />
                            }


                        </Row>
                        <Row>
                            {
                                !loading ?
                                    <>
                                        <KnowsAbout
                                            topic={topic}
                                            key={topic}
                                        />
                                    </>
                                    :
                                    <Skeleton active />
                            }

                        </Row>
                    </Col>
                </Row>
            </div>


        )
    }
}

export default Profile;
