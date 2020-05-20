import React, { Component } from "react";
import {
    Container, Row, Col, Button
} from 'reactstrap';
import * as actions from './../../actions/index';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import './ProductCartContainer.css';
//import * as actions from './../../actions/index';


class ProductCartContainer extends Component {

    onDeleteCart = (product) => {
        this.props.deleteCart(product)
    };

    onDeleteAllCart = () => {
        this.props.deleteAllCart()
    };

    onIncreaseCart = (cart) => {
        this.props.onIncrease(cart);
    };

    render() {
        var { carts } = this.props;
        var money = 0;
        var countCart = 0;
        for (var cart of carts) {
            money += cart.product.price * cart.count;
            countCart  += cart.count;
        }
        var elmCarts = <Col>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Hình ảnh</th>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        carts.map((cart, index) => {
                            return <tr key = {index}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    <img src={cart.product.imageUrl} alt="Carts" />
                                </td>
                                <td>
                                    {cart.product.name}
                                </td>
                                <td>
                                    {cart.product.price}
                                </td>
                                <td>
                                    <Button onClick={() => this.onDeleteCart(cart.product)} color="danger" > - </Button> &nbsp;
                                    {cart.count} &nbsp;
                                    <Button onClick={() => this.onIncreaseCart(cart.product)} color="success" > + </Button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </Col>

        return (
            <Container>
                <Row className="mtop-15">
                    <Col>
                        <h2>Giỏ hàng ({countCart} sản phẩm)</h2>
                        <h3>Thành tiền : {money} $</h3>
                    </Col>
                    <Col>
                        <Button color="primary">Tiến hành đặt hàng</Button> &nbsp;
                        <Button onClick={this.onDeleteAllCart} color="danger">Xóa tất cả</Button>
                    </Col>
                </Row>
                <hr />
                <Row>
                    {elmCarts}
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        carts: state.carts,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        deleteCart: (product) => {
            dispatch(actions.deleteCart(product))
        },
        deleteAllCart: () => {
            dispatch(actions.deleteAllCart())
        },
        onIncrease: (cart) => {
            dispatch(actions.addToCart(cart))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCartContainer);