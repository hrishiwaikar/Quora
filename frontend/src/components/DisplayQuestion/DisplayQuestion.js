import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';

import axios from 'axios';
import { post, get } from './../../api.js';
import moment from 'moment';
import 'react-quill/dist/quill.snow.css';
import { Typography, Avatar, Icon, Button, Skeleton, Spin, message } from 'antd';
import './../../style.css';
import { Answer } from '../answer/Answer.js';

const { Title, Text } = Typography;

export class TestDisplayQuestion extends Component {

    render = () => {
        console.log('Render of test');
        let questions = [
            {
                questionId: '1031390ABC',
                questionText: 'What is the first thing a child learns as it comes out of the womb?',
                hasAnswer: true,
                noOfAnswers: 10,
                answerId: 1,
                answererProfileImage: "https://qph.fs.quoracdn.net/main-thumb-16193221-200-EO9EO7XcPOETr1ZfTiWvDKKVxqAzgtzG.jpeg",
                isAnonymous: false, // is the answerer anonymous
                profileCredential: "Roger Scott, Product Architect at GammaTech, Inc. (2015-present)", // profile credential of answerer
                createdAt: '2018-04-10T10:20:30Z', // answer created date time 
                answererId: 21, // answerer user id
                answerText: "As an engineer, I like to build things. I’m also not very patient. Programming is then a good occupation because I can build interesting things that work much more quickly (and cheaply, at least in terms of materials) than I would be able to do in pretty much any other engineering discipline. I also like to help other people (you know, the whole messiah complex thing ;->), so seeing my work used by others is gratifying.",
                upvotes: 252,
                downvotes: 50,
                userUpvoted: false, // has the current user in session upvoted this answer?
                userDownvoted: false, // ... downvoted this answer?
                comments: [], // all comments
                userBookmarked: false, // user has bookmarked
                userIsFollowingAnswerer: false, // is the current user following the answerer
                cant_follow: false // is true if answer is written by the user himself/herself
            },
            {
                questionId: '0038912923',
                questionText: 'Is it okay to talk on phone at the gas station?',
                hasAnswer: false,
                noOfAnswers: 150,
                answerId: 1,
                answererProfileImage: "https://qph.fs.quoracdn.net/main-thumb-19904714-200-uwrpnqdikmuzquejfxjkxurnvwytrqhs.jpeg",
                isAnonymous: false, // is the answerer anonymous
                profileCredential: "Roger Scott, Product Architect at GammaTech, Inc. (2015-present)", // profile credential of answerer
                createdAt: '2018-04-10T10:20:30Z', // answer created date time 
                answererId: 21, // answerer user id
                answerText: "As an engineer, I like to build things. I’m also not very patient. Programming is then a good occupation because I can build interesting things that work much more quickly (and cheaply, at least in terms of materials) than I would be able to do in pretty much any other engineering discipline. I also like to help other people (you know, the whole messiah complex thing ;->), so seeing my work used by others is gratifying.",
                upvotes: 252,
                downvotes: 50,
                userUpvoted: false, // has the current user in session upvoted this answer?
                userDownvoted: false, // ... downvoted this answer?
                comments: [], // all comments
                userBookmarked: false, // user has bookmarked
                userIsFollowingAnswerer: false, // is the current user following the answerer
                cant_follow: false // is true if answer is written by the user himself/herself
            },
        ]

        return (<>
            {questions.map((question) => {
                return (
                    <Row className="paddingTop-l marginTop-l">
                        <Col offset={5} span={12} >
                            <DisplayQuestion data={question} />
                        </Col>
                    </Row>
                )
            })}
        </>
        )
    }
}

class DisplayQuestion extends Component {

    render = () => {
        console.log('Render of display question ');
        let data = this.props.data;
        return (
            <>
                <Row>
                    <Title level={4} className="quora_question_text">{data.questionText}</Title>
                </Row>
                {data.hasAnswer === true ?
                    <Row>
                        <Answer data={data} />
                    </Row>

                    :
                    null
                }

            </>
        );
    }
}

