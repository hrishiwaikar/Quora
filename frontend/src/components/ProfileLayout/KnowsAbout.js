import React, { Component } from 'react'
import { Typography, Icon, Divider } from 'antd';
import './KnowsAbout.css';

const { Title } = Typography;

class KnowsAbout extends Component {
    render() {
        return (
            <div className="knows-about">
                <Title level={4}>Knows About</Title>
                <Divider />
            </div>
        )
    }
}

export default KnowsAbout;