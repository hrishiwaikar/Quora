import React, { Component } from 'react';
import { Menu, Icon, Input, Button, Select } from 'antd';
const Option = Select.Option;

class Search extends Component {

    state = {
        value: undefined,
        data: [{ 'value': 'Hrishikesh Waikar', 'text': 'Hrishikesh Waikar', 'type': 'PERSON', 'id': '129321bwejf' },
        { 'value': 'What is the nature of black hole? Why are they not visible?', 'text': 'What is the nature of black hole? Why are they not visible?', 'type': 'QUESTION', 'id': '932o3rrjfn' },
        { 'value': 'Black Holes', 'text': 'Black Holes', 'type': 'TOPIC', 'id': '0HFD2' }]
        // data: []
    }

    handleSearch = (value) => {
        console.log('In handle search ', value.name);
        // make api call sending the value and results are set to data for display and select 


    }

    handleRedirection = (data) => {
        console.log('In handle redirrection ', data);
        if (data.type === 'PERSON') {

        } else if (data.type === 'QUESTION') {

        } else if (data.type === 'TOPIC') {

        }
    }

    handleChange = (value) => {
        console.log('In hamdle Change ', value);
        let data = this.state.data;

        for (var i = 0; i < data.length; i++) {
            if (value === data[i].value) {
                this.handleRedirection(data[i]);
            }
        }
    }

    render = () => {

        const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>)
        return (<>

            <Select
                showSearch
                value={this.state.value}
                placeholder="Search on Quora"
                style={{ width: 250 }}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                notFoundContent={null}
            >
                {options}
            </Select>
        </>)
    }
}

export default Search;