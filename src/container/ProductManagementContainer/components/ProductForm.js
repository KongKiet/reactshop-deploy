import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'reactstrap';
import './../ProductManagementContainer.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {connect} from 'react-redux';
import * as actions from '../../../actions/index';


import {faTimes} from '@fortawesome/free-solid-svg-icons';

const uuidv4 = require('uuid/v4');

class ProductForm extends Component  {
    constructor(props) {
        super(props)
        this.state = {
            id : '',
            name : '',
            price : '',
            imageUrl : '',
            status : false
        }
    }

    componentWillMount() {
        if(this.props.itemEditing && this.props.itemEditing.id!==null) {
            this.setState ({
                id :  this.props.itemEditing.id,
                name : this.props.itemEditing.name,
                price : this.props.itemEditing.price,
                imageUrl : this.props.itemEditing.imageUrl,
                status : this.props.itemEditing.status
            })
        } 
        else {
            this.onClear();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.itemEditing) {
            this.setState({
                id :  nextProps.itemEditing.id,
                name : nextProps.itemEditing.name,
                price : nextProps.itemEditing.price,
                imageUrl : nextProps.itemEditing.imageUrl,
                status : nextProps.itemEditing.status
            })
        }
        else {
            this.onClear();
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status') {
            value = target.value ==='true' ? true : false;
        }
        this.setState({
            [name] : value 
        });
    };

    onExit = () => {
        this.props.onChangeDisplay();
        this.clearItem()
    }

    clearItem = () => {
        this.props.onClearItem()
    };

    onSubmit = (event) => {
        event.preventDefault();
        if (this.state.id === '') {
            let id = uuidv4();
            let item = {
                id: id,
                name: this.state.name,
                price : this.state.price,
                imageUrl : this.state.imageUrl,
                status: this.state.status
            }
            this.props.onAddItem(item);
        }
        else {
            let id = this.state.id;
            let item = {
                id : this.state.id,
                name : this.state.name,
                price : this.state.price,
                imageUrl : this.state.imageUrl,
                status : this.state.status
            };
            this.props.updateItem(id, item)
        }
        
        this.props.onClearItem();
    };

    render() {
        var state = this.state;
        var clearForm = state.id === '' ? <Button onClick={this.clearItem} type="button" color="danger">
        <FontAwesomeIcon className="" icon={faTimes} />
                Hủy bỏ
            </Button> : '';
        return (
            <Col xs="4">
                <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            {state.id !== '' ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
                        </h3>
                        <Button onClick = {this.onExit} className="panel-exit" color="danger">Thoát</Button>
                    </div>
                    <div className="panel-body">
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label>Tên Sản phẩm :</Label>
                                <Input  type="text" 
                                        name="name" 
                                        value = {state.name}
                                        onChange = {this.onChange}
                                         />
                            </FormGroup>
                            <FormGroup>
                                <Label>Giá Sản phẩm :</Label>
                                <Input  type="number" 
                                        name="price" 
                                        value = {state.price}
                                        onChange = {this.onChange}
                                         />
                            </FormGroup>
                            <FormGroup>
                                <Label>Url hình sản phẩm :</Label>
                                <Input  type="text" 
                                        name="imageUrl" 
                                        value = {state.imageUrl}
                                        onChange = {this.onChange}
                                         />
                            </FormGroup>
                            <FormGroup>
                                <Label>Trạng thái :</Label>
                                <Input  type="select" 
                                        name="status" 
                                        value = {state.status}
                                        onChange = {this.onChange}
                                        >
                                    <option value={true}>Còn hàng</option>
                                    <option value={false}>Hết hàng</option>
                                </Input>
                            </FormGroup>
                            <div className="text-center">
                                <Button type="submit" color="success">lưu lại</Button> &nbsp;
                                {clearForm}
                            </div>
                        </Form>
                    </div>
                </div>
            </Col>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        itemEditing : state.itemEditing
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddItem : (item) => {
            dispatch(actions.addItemRequest(item));
        },
        onClearItem : () => {
            dispatch(actions.onClear());
        },
        updateItem : (id, item) => {
            dispatch(actions.updateItemRequest(id, item))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);