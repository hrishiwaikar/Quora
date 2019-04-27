import React, { Component } from 'react';
import { Layout } from 'antd';

import Navbar from '../Navbar/Navbar';
import './home.css';

const { Content } = Layout;

class Home extends Component {
    state = {

    };

    render = () => {

        return (
            <div>
                <Layout className="layout" >
                    <Navbar />
                    <Content className="content">
                        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
                    </Content>
                </Layout>
            </div>
        );
    };
}


export default Home;