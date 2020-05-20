import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'reactstrap';
import './Control.css';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


class ControlSort extends Component {

    onClick = (sortBy, sortValue) => {
        this.props.onSort({
            by: sortBy,
            value: sortValue
        });
    }

    render() {
        //console.log(this.props.sort);
        return (
            <Col xs="auto">
                <UncontrolledDropdown>
                    <DropdownToggle color="primary" caret>
                        Sắp xếp
                                </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => this.onClick('name', 1)}>
                            Tên từ A-Z &nbsp;
                            {(this.props.sort.by === 'name' && this.props.sort.value === 1) ? <FontAwesomeIcon className="" icon={faCheck} /> : ''}
                        </DropdownItem>
                        <DropdownItem onClick={() => this.onClick('name', -1)}>
                            Tên từ Z-A &nbsp;
                            {(this.props.sort.by === 'name' && this.props.sort.value === -1) ? <FontAwesomeIcon className="" icon={faCheck} /> : ''}

                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => this.onClick('status', 1)}>
                            Trạng thái còn hàng &nbsp;
                            {(this.props.sort.by === 'status' && this.props.sort.value === 1) ? <FontAwesomeIcon className="" icon={faCheck} /> : ''}
                        </DropdownItem>
                        <DropdownItem onClick={() => this.onClick('status', -1)}>
                            Trạng thái hết hàng &nbsp;
                            {(this.props.sort.by === 'status' && this.props.sort.value === -1) ? <FontAwesomeIcon className="" icon={faCheck} /> : ''}
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Col>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sort: state.sort
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSort: (sort) => {
            dispatch(actions.sortItem(sort));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlSort);