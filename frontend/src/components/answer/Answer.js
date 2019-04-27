import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';

import axios from 'axios';
import { post, get } from './../../api.js';
import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Typography, Avatar, Icon, Button, Skeleton, Spin, message } from 'antd';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import './../../style.css';
const { Title, Text } = Typography;


export class Answer extends Component {
    state = {}

    render = () => {
        let data = this.props.data;

        console.log('Data ', data);
        return (
            <div className="AnswerBase">
                <Row>
                    <AnswererInfo answererId={data.answererId} profileCredential={data.profileCredential} answerDate={data.createdAt} />
                </Row>
                <Row>
                    <AnswerText data={data} />
                </Row>
                <Row>
                    <VotingAndBookMark data={data} />
                </Row>
            </div>
        )
    }
}

export class AnswererInfo extends Component {
    state = {
        userIsFollowingAnswerer: this.props.userIsFollowingAnswerer
    }


    handleOnFollowClick = () => {
        let component = this;

        let updatedUserIsFollowingAnswerer = !this.state.userIsFollowingAnswerer;

        // make api call

        // in success
        component.setState({
            userIsFollowingAnswerer: updatedUserIsFollowingAnswerer
        });
    }
    render = () => {
        // let data = this.props.data;
        let answererId = this.props.answererId;
        let profileCredential = this.props.profileCredential;
        let answerDate = this.props.answerDate;
        var date = null;
        if (answerDate !== undefined && answerDate !== null) {
            date = moment(answerDate, moment.ISO_8601).format('MMM D, YYYY');

        }

        let cant_follow = this.props.cant_follow;
        let image_src = 'http://10.0.0.86:7836/v1/users/' + answererId + '/image/';
        image_src = "https://qph.fs.quoracdn.net/main-thumb-16193221-200-EO9EO7XcPOETr1ZfTiWvDKKVxqAzgtzG.jpeg"

        let userIsFollowingAnswerer = this.state.userIsFollowingAnswerer;

        return (
            <>
                <Row className="text_color_black paddingTop-s paddingBottom-s" gutter={16} type="flex" justify="space-around" align="middle">
                    <Col span={2}>
                        <Avatar size="large" src={image_src} />
                    </Col>
                    <Col span={20}>
                        <Row type="flex" justify="start" align="top">
                            {profileCredential}
                        </Row>
                        {date !== null ?
                            <Row>
                                <Text className="font_size_xs text_color_quora_faint_text" disabled>Answered {date}</Text>
                            </Row>
                            :
                            <Row>{""}</Row>
                        }
                    </Col>
                    {cant_follow !== true
                        ?
                        <>
                            {userIsFollowingAnswerer === true
                                ?
                                <Col span={2}>
                                    <Avatar size="medium" icon="user-add" className="text_color_blue" style={{ backgroundColor: "#eaf4ff" }} />
                                </Col>
                                :
                                <Col span={2}>
                                    <Avatar size="medium" icon="user-add" className="text_color_blue" style={{ backgroundColor: "#eaf4ff" }} />
                                </Col>

                            }
                        </>
                        :
                        <Col span={2}>
                        </Col>
                    }

                </Row>
            </>
        )
    }
}


class AnswerText extends Component {
    render = () => {
        let data = this.props.data;

        return (<>
            <Row className="marginTop-m">
                <Text className="quora_answer_text">

                    {/* {ReactHtmlParser(this.props.new_answer, options)} */}
                    {data.answerText}

                </Text>
            </Row>
            <Row className="marginTop-s">
                <Text className="font_size_xs">{data.upvotes} Views</Text>
            </Row>
        </>)
    }
}

class VotingAndBookMark extends Component {
    state = {
        userUpvoted: this.props.data.userUpvoted,
        upvotes: this.props.data.upvotes,
        userDownvoted: this.props.data.userDownvoted,
        userBookmarked: this.props.data.userBookmarked
    }

    handleUpvoteChange = () => {
        let component = this;
        console.log("In handle upvote change ");
        let userUpvoted = this.state.userUpvoted;
        let updatedUpvoteStatus = !userUpvoted;

        // make an api call to set the status to upvoted true

        // axios({
        //     method: 'post', //you can set what request you want to be
        //     url: '/announcements',
        //     data: post_data,
        //     headers: {
        //         'x-auth-token': Auth.get_token()
        //     }
        // })
        //     .then(response => {
        //         console.log('gOT Response ', response);
        //         component.setState({
        //             course: response.data
        //         });
        //         this.getFacultyAnnouncements()
        //     })
        //     .catch(error => {
        //         console.log('Error msg ', error.response.data);
        //     });


        // post('', '', () => {

        // }, () => {

        // })

        // In success

        let upvotes = component.state.upvotes;

        if (updatedUpvoteStatus === false) {
            upvotes = upvotes - 1;
        } else {
            upvotes = upvotes + 1;
        }

        component.setState({
            userUpvoted: updatedUpvoteStatus,
            upvotes: upvotes
        });
    }


    handleDownVoting = () => {
        let component = this;

        let userDownvoted = this.state.userDownvoted;

        let updatedDownVoteStatus = !userDownvoted;

        // in success 
        component.setState({
            userDownvoted: updatedDownVoteStatus
        })
    }


    handleBookMarking = () => {
        let component = this;
        let updatedBookMarkStatus = !this.state.userBookmarked;

        // Make an api call


        // in success
        component.setState({
            userBookmarked: updatedBookMarkStatus
        })
    }

    render = () => {


        return (
            <>
                <Row className="marginTop-m" gutter={16}>
                    <Col span={3}>
                        {this.state.userUpvoted === true
                            ?
                            <Button shape="round" icon="caret-up" size="small" className="no_border text_color_blue" style={{ paddingLeft: 0 }} onClick={this.handleUpvoteChange} onFocus={() => { }}>Upvoted &nbsp;·&nbsp;{this.state.upvotes}</Button>
                            :
                            <Button shape="round" icon="caret-up" size="small" className="no_border" style={{ paddingLeft: 0 }} onClick={this.handleUpvoteChange} onFocus={() => { }}>Upvote &nbsp;·&nbsp;{this.state.upvotes}</Button>

                        }

                    </Col>
                    <Col offset={18} span={1}>
                        {this.state.userDownvoted === true
                            ?
                            <Button shape="circle" icon="caret-down" theme="filled" size="small" className="no_border text_color_blue" onClick={this.handleDownVoting}></Button>
                            :
                            <Button shape="circle" icon="caret-down" theme="empty" size="small" className="no_border" onClick={this.handleDownVoting}></Button>
                        }

                    </Col>
                    <Col span={2}>
                        {this.state.userBookmarked === true
                            ?
                            <Button shape="circle" icon="book" size="small" className="no_border text_color_blue" onClick={this.handleBookMarking} ></Button>
                            :
                            <Button shape="circle" icon="book" theme="filled" size="small" className="no_border" onClick={this.handleBookMarking}></Button>
                        }

                    </Col>
                </Row>
            </>
        )
    }
}
