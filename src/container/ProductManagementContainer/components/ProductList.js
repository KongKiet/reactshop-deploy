import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'reactstrap';
import './../ProductManagementContainer.css';
import {Input} from 'reactstrap';
import { Table } from 'reactstrap';
import ProductListItem from './ProductListItem';
import {connect} from 'react-redux';
import * as actions from '../../../actions/index';


class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var filter = {
            name : name === 'filterName' ? value : this.state.filterName,
            status : name ==='filterStatus' ? value : this.state.filterStatus
        };
        this.props.onFilterTable(filter);
        this.setState ({
            [name] : value
        });
    }

    componentDidMount() {
        this.props.fetchAllItems();
    }

    render() {
        var {products, filterTable, keyword, sort} = this.props;
        //filter
        if(filterTable.name) {
            products = products.filter((product) => {
                return product.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1
            });
        }

        products = products.filter((product)=> {
            if(filterTable.status === -1) {
                return product;
            }else {
                return product.status === (filterTable.status === 1 ? true : false);
            }
        });

        //search
        products = products.filter((product) => {
            return product.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        });

        //sort 
        if(sort.by === 'name') {
            products.sort((a, b) => {
                if(a.name > b.name) return sort.value;
                else if (a.name < b.name) return -sort.value;
                else return 0;
            });
        } else {
            products.sort((a, b) => {
                if(a.status > b.status) return -sort.value;
                else if (a.status < b.status) return sort.value;
                else return 0;
            })
        }

        var elmProducts = products.map((product, index) => {
           return <ProductListItem key={product.id} index={index} product={product} />
        });


        return (
            <Row className="mt-15">
                <Col>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>stt</th>
                                <th>Tên</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row"></th>
                                <td>
                                    <Input onChange = {this.onChange} type="text" name="filterName" id="textId" />
                                </td>
                                <td>
                                    <Input onChange = {this.onChange} id = "mySelect" type="select" name="filterStatus">
                                        <option value = "0">Hết hàng</option>
                                        <option value = "1">Còn hàng</option>
                                        <option value = "-1">Tất cả</option>
                                    </Input>
                                </td>
                                <td></td>
                            </tr>
                            {elmProducts}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products : state.products,
        filterTable : state.filterTable,
        keyword : state.search,
        sort : state.sort
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllItems : () => {
            dispatch(actions.listAllRequest());
        },
        onFilterTable : (filter) => {
            dispatch(actions.filterItem(filter));
        }
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(ProductList);