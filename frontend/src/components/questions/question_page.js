import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import './../../style.css';

import { Typography } from 'antd';

const { Title, Text } = Typography;


class QuestionPage extends Component {
    state = {

    };

    render = () => {

        return (
            <div>
                <Row className="marginTop-l">
                    <Col span={13} offset={5}>
                        <Row>
                            <Title level={3}>What advice will you give to new programmers?</Title>

                        </Row>

                        <Row className="paddingTop-l">
                            <Text className="paddingBottom-m" strong>10 Answers</Text>
                            <hr />
                        </Row>
                        <Row>

                        </Row>
                    </Col>
                </Row>
            </div>

        );
    };
}


export default QuestionPage;