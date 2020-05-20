import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'reactstrap';
import './Control.css';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import * as actions from './../../actions/index';

class ControlSearch extends Component{

    constructor(props) {
        super(props);
        this.state = {
            keyword : ''
        }
    }

    onHandleChange = (event) => {
        this.setState({
            keyword: event.target.value
        });
    }

    onSearch = () => {
        this.props.onSearch(this.state.keyword)
    }

    render() {
        return (
            <Col xs="8">
                <InputGroup>
                    <Input 
                    name = "keyword"
                    value = {this.state.keyword}
                    type = "text"
                    placeholder = "Nhập từ khóa"
                    onChange = {this.onHandleChange}
                    />
                    <InputGroupAddon addonType="append">
                        <Button onClick = {this.onSearch} type = "button" color="primary">
                            <FontAwesomeIcon icon={faSearch} />
                                             Tìm
                                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </Col >
        )
    }
}


const mapDispatchToProps = (dispatch, props) => {
    return{
        onSearch : (keyword) => {
            dispatch(actions.searchItem(keyword));
        }
    }
}

export default connect(null, mapDispatchToProps)(ControlSearch);