import React, { Component } from 'react'
import { Typography, Icon, Divider } from 'antd';
import './CredentialAndHighlights.css';

import EducationCredential from './EducationCredential';
import EmploymentCredential from './EmploymentCredential';
import LocationCredential from './LocationCredential';

const { Text, Title } = Typography;

class CredentialAndHighlights extends Component {
    state = {
        visible: false
    }

    toggleModal = () => {
        this.setState((state, props) => ({
            visible: !state.visible
        }))
    }
    render() {
        return (
            <div className="credential-and-highlights">
                <Title level={4}>Credential & Highlights</Title>
                <Divider />
                <EducationCredential />
                <EmploymentCredential />
                <LocationCredential />
            </div>
        )
    }
}

export default CredentialAndHighlights