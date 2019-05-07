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
import { Answer, AnswererInfo } from './../answer/Answer.js';

const { Title, Text } = Typography;

const options = {
    decodeEntities: true,
    transform
}

function transform(node, index) {
    if (node.type === 'tag' && node.name === 'p') {
        node.attribs = { style: "margin-bottom: 0" };
        return convertNodeToElement(node, index, transform);
    }

    if (node.type === 'tag' && node.name === 'img') {
        return convertNodeToElement(node, index, transform);
    }
}

class QuestionPage extends Component {

    state = {
        result: null,
        new_answer: '',
        addNewAnswer: false,
        submitAnswerLoading: false,
        userHasAnswered: false,
        related_questions: []
    };

    componentDidMount = () => {
        this.getQuestionAndAnswers();
        this.getRelatedQuestions();
    }

    getQuestionAndAnswers = () => {
        let component = this;

        let url = 'v1/questions/'
        let id = 'dca8fad0-688d-11e9-93ac-a76535bf90ea';

        let onSuccess = (response) => {
            console.log('gOT Response ', response);
            component.setState({
                result: response.data.data,
                userHasAnswered: response.data.data.userHasAnswered
            });

        }

        let onFailure = (error) => {
            console.log('Error msg ', error.response.data);
        }

        get(url, id, onSuccess, onFailure);

        let result = {
            id: 2,
            questionText: "What's the most satisfying thing about working as a computer programmer?",
            userIsFollowingTheQuestion: false,
            profileImage: "https://qph.fs.quoracdn.net/main-thumb-19904714-200-uwrpnqdikmuzquejfxjkxurnvwytrqhs.jpeg",
            profileCredential: "Hrishikesh Waikar, Love building systems that transform my surroundings.",
            userHasAnswered: false,
            followersCount: 10,
            topics: ['Computer Science', 'Programming', 'Sc'],
            answers: [
                {
                    answerId: 1,
                    answererProfileImage: "https://qph.fs.quoracdn.net/main-thumb-16193221-200-EO9EO7XcPOETr1ZfTiWvDKKVxqAzgtzG.jpeg",
                    isAnonymous: false,
                    profileCredential: "Roger Scott, Product Architect at GammaTech, Inc. (2015-present)",
                    createdAt: '2018-04-10T10:20:30Z',
                    answererId: 21,
                    answerText: "As an engineer, I like to build things. I’m also not very patient. Programming is then a good occupation because I can build interesting things that work much more quickly (and cheaply, at least in terms of materials) than I would be able to do in pretty much any other engineering discipline. I also like to help other people (you know, the whole messiah complex thing ;->), so seeing my work used by others is gratifying.",
                    upvotes: 252,
                    downvotes: 50,
                    userUpvoted: false,
                    userDownvoted: false,
                    comments: [],
                    userBookmarked: false,
                    userIsFollowingAnswerer: false
                },
                {
                    answerId: 2,
                    answererProfileImage: "https://qph.fs.quoracdn.net/main-thumb-10469463-200-yI3VrWqmn4osoGyNMsImyZYll3lGGbNC.jpeg",
                    isAnonymous: false,
                    profileCredential: "Mason Porter, Professor, Department of Mathematics, UCLA",
                    createdAt: '2017-02-17T10:20:30Z',
                    answererId: 45,
                    answerText: "Knowledge is not a scalar quantity, so I can’t answer this question in precisely the way that it was asked. (It is not well-defined in such broad, all-encompassing terms.) Obviously, for every student with whom I have ever interacted, there will exist a topic — presumably a large number of topics — about which they know more than me. Whether this topic has anything to do with, for example, a course that I am teaching is another story entirely. I have certainly had students who know more than me about specific topics, especially when I teach advanced courses (e.g., with Ph.D. students taking it). For example, I teach a graduate-level networks courses, and I expect the statistics Ph.D. students in it to know more about statistical methods than I do, as the focus of their studies is different from my main expertise. And when it comes to research advisees, I not only have had students who know more than me about many topics, I expect all such students — and I do mean literally all of them — to ultimately know their specific topics (e.g., of their dissertation or of the papers on which they are first author) better than I do. They are the ones leading the project, whereas I am the mentor. So, yes, in the senses that I indicated above, I have had numerous students who “know more” than I do.  Thanks for the A2A.",
                    upvotes: 100,
                    downvotes: 0,
                    userUpvoted: true,
                    userDownvoted: false,
                    comments: [],
                    userBookmarked: true,
                    userIsFollowingAnswerer: true

                }
            ]
        }
        var delayInMilliseconds = 2000; //1 second

        setTimeout(function () {
            //your code to be executed after 1 second
            component.setState({ result: result, userHasAnswered: result.userHasAnswered });
        }, delayInMilliseconds);


    }

    getAnotherResult = () => {
        let component = this;
        let result = {
            id: 2,
            questionText: "What's the most satisfying thing about working as a computer programmer?",
            userIsFollowingTheQuestion: false,
            profileImage: "https://qph.fs.quoracdn.net/main-thumb-19904714-200-uwrpnqdikmuzquejfxjkxurnvwytrqhs.jpeg",
            profileCredential: "Hrishikesh Waikar, Love building systems that transform my surroundings.",
            userHasAnswered: false,
            followersCount: 10,
            answers: [
                {
                    id: 2,
                    answererProfileImage: "https://qph.fs.quoracdn.net/main-thumb-10469463-200-yI3VrWqmn4osoGyNMsImyZYll3lGGbNC.jpeg",
                    isAnonymous: false,
                    profileCredential: "Daniel Dsouza, Professor, Department of Physics, UCSD",
                    createdAt: '2017-02-17T10:20:30Z',
                    answererId: 45,
                    answerText: "Knowledge is not a scalar quantity, so I can’t answer this question in precisely the way that it was asked. (It is not well-defined in such broad, all-encompassing terms.) Obviously, for every student with whom I have ever interacted, there will exist a topic — presumably a large number of topics — about which they know more than me. Whether this topic has anything to do with, for example, a course that I am teaching is another story entirely. I have certainly had students who know more than me about specific topics, especially when I teach advanced courses (e.g., with Ph.D. students taking it). For example, I teach a graduate-level networks courses, and I expect the statistics Ph.D. students in it to know more about statistical methods than I do, as the focus of their studies is different from my main expertise. And when it comes to research advisees, I not only have had students who know more than me about many topics, I expect all such students — and I do mean literally all of them — to ultimately know their specific topics (e.g., of their dissertation or of the papers on which they are first author) better than I do. They are the ones leading the project, whereas I am the mentor. So, yes, in the senses that I indicated above, I have had numerous students who “know more” than I do.  Thanks for the A2A.",
                    upvotes: 100,
                    downvotes: 0,
                    userUpvoted: true,
                    userDownvoted: false,
                    comments: null,
                    userBookmarked: true

                },
                {
                    id: 1,
                    answererProfileImage: "https://qph.fs.quoracdn.net/main-thumb-16193221-200-EO9EO7XcPOETr1ZfTiWvDKKVxqAzgtzG.jpeg",
                    isAnonymous: false,
                    profileCredential: "Amadeus Mozart, Musician by choice",
                    createdAt: '2018-04-10T10:20:30Z',
                    answererId: 21,
                    answerText: "As an engineer, I like to build things. I’m also not very patient. Programming is then a good occupation because I can build interesting things that work much more quickly (and cheaply, at least in terms of materials) than I would be able to do in pretty much any other engineering discipline. I also like to help other people (you know, the whole messiah complex thing ;->), so seeing my work used by others is gratifying.",
                    upvotes: 252,
                    downvotes: 50,
                    userUpvoted: false,
                    userDownvoted: false,
                    comments: null,
                    userBookmarked: false
                },

            ]
        }
        var delayInMilliseconds = 2000; //1 second

        setTimeout(function () {
            //your code to be executed after 1 second
            component.setState({ result: result, userHasAnswered: result.userHasAnswered });
        }, delayInMilliseconds);

    }

    getRelatedQuestions = () => {
        let related_questions = [
            {
                'id': 2,
                'questionText': 'What is the programming language of your choice?'
            },
            {
                'id': 3,
                'questionText': 'Why does everybody love coding in python?'
            },
            {
                'id': 3,
                'questionText': 'What makes one a good programmer - skills or logic?'
            },
            {
                'id': 4,
                'questionText': 'Which one is better for building secured applications, Python or java?'
            },
            {
                'id': 5,
                'questionText': 'How does a python program convert into machine level set of instructions??'
            },
            {
                'id': 6,
                'questionText': 'What is the difference between compiled and interpreted langauge? Which one is better for critical systems?'
            },
            {
                'id': 7,
                'questionText': 'Why is there a language named after a mathematician Ada Lovelace?'
            },
            {
                'id': 8,
                'questionText': 'Is C really better than python for competitive programming?'
            },
        ]

        this.setState({
            related_questions
        })
    }

    handleNewAnswerChange = (value) => {
        // console.log("In handle ans change ", value);
        this.setState({ new_answer: value });
    }

    handleSubmitAnswer = () => {
        let answer = this.state.new_answer;
        //make an api call to submit the answer

        //in successs
        this.setState({
            new_answer: '',
            userHasAnswered: true,
            addNewAnswer: false
        });
        this.getAnotherResult();
        message.success('Answer posted successfully');
    }

    handleUserWantsToAnswer = () => {
        this.setState({
            addNewAnswer: !this.state.addNewAnswer
        })
    }
    render = () => {
        let result = this.state.result;
        // console.log('Answer ', this.state.new_answer);
        return (
            <div>
                <Row className="marginTop-l text_color_black">
                    <Col span={15}>
                        <Row>
                            {result != null
                                ?
                                <Title level={3} className="quora_question_text">{result.questionText}</Title>
                                :
                                <>
                                    <Skeleton active />
                                </>
                            }

                        </Row>

                        <Row type="flex" justify="start" align="top">
                            <Col span={4}>
                                {result !== null && result.userHasAnswered !== true ? <Button shape="round" icon="edit" size="small" className="no_border" onClick={this.handleUserWantsToAnswer} style={{ paddingLeft: 0 }}>Answer</Button> : null}
                            </Col>
                            <Col span={4}>
                                {result !== null && result.userIsFollowingTheQuestion !== true ? <Button shape="round" icon="wifi" size="small" className="no_border" style={{ paddingLeft: 0 }}>Follow &nbsp;·&nbsp;{result.followersCount}</Button> : null}
                            </Col>
                        </Row>


                        {this.state.addNewAnswer === true ?

                            <>
                                <Row className="bg_color_light_gray paddingLeft-s marginTop-m">
                                    <AnswererInfo profileImage={result.userId} profileCredential={result.profileCredential} cant_follow={true} />
                                </Row>
                                <Row style={{ paddingBottom: 48, marginBottom: 27 }} className="marginBottom-l">

                                    <ReactQuill value={this.state.new_answer}
                                        style={{ height: 100 }}
                                        theme="snow"
                                        onChange={this.handleAnswerChange}
                                        modules={QuestionPage.modules}
                                        formats={QuestionPage.formats}
                                    />
                                </Row>
                                <Row className="marginTop-l" type="flex" justify="start">
                                    <Col><Button type="primary" size="small" className="quora_button_blue" onClick={this.handleSubmitAnswer}>
                                        Submit
                                    </Button></Col>
                                </Row>
                            </>
                            :
                            null
                        }


                        <Row className="marginTop-m paddingTop-s">
                            {result !== null
                                ?
                                <Text strong>{result.answers.length} Answers</Text>
                                :
                                <>
                                    <hr />
                                    <Spin className="marginTop-l" size="large" />

                                </>
                            }

                        </Row>

                        <Row className="marginTop-m">
                            {result !== null
                                ?
                                result.answers.map((answer) => {
                                    return (
                                        <Answer data={answer} new_answer={this.state.new_answer} />
                                    )
                                })
                                :
                                <Skeleton className="marginTop-l" active />
                            }

                        </Row>
                    </Col>
                    <Col offset={1} span={5}>
                        <Row className="marginTop-s">
                            <Text>Related Questions</Text>
                            <hr />
                        </Row>
                        {this.state.related_questions !== null
                            ?
                            this.state.related_questions.map((related_question) => {
                                return (
                                    <Row className="marginTop-m paddingTop-s text_color_quora_blue font_size_xs">
                                        {related_question.questionText}
                                    </Row>
                                )
                            })

                            :
                            <Skeleton className="marginTop-l" active />
                        }
                        <Row className="marginTop-m paddingTop-s">
                            <Button shape="round" icon="plus" size="small" className="no_border text_color_quora_blue font_bold" style={{ paddingLeft: 0, fontSize: 13 }}>Ask New Question</Button>
                        </Row>
                    </Col>
                </Row>
            </div>

        );
    };
}



/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
QuestionPage.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: true,
    }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
QuestionPage.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

export default QuestionPage;