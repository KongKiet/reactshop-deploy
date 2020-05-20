import React, { Component } from "react";
import {
    Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, Button
} from 'reactstrap';
import {connect} from 'react-redux';
import * as actions from './../../actions/index';
import ControlSearch from './../../components/Control/ControlSearch';
import './ProductListShowContainer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';


class ProductListShowContainer extends Component {

    componentDidMount() {
        this.props.fetchAllItems();
    }

    onAddToCart = (item) => {
        this.props.onAddToCart(item);
    }

    render() {
        var {products, keyword} = this.props; //truy xuất được các thành phần trong product thông qua biến state
        //search
        products = products.filter((product) => {
            return product.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        });

        var elmProducts;
        if (products.length === 0) {
            elmProducts = <Col><h5>Không có sản phẩm tìm kiếm</h5></Col>
        } else {
            elmProducts = products.map((product, index) => {
                return  <Col key = {index} sm="3">
                    <Card>
                        <CardImg top width="100%"
                            className = "img"
                            src={product.imageUrl}
                            alt="Card image cap" />
                        <CardBody>
                            <CardTitle>{product.name}</CardTitle>
                            <CardText>{product.price} $</CardText>
                            {product.status ? <Button onClick = {() => this.onAddToCart(product)} color="success" > Thêm vào giỏ <FontAwesomeIcon icon={faCartPlus} /> </Button> : <CardTitle>Hết hàng</CardTitle>}
                        </CardBody>
                    </Card>
                </Col>
            });
        }

        return (
            <Container>
                <Row className = "mtop-15">
                    <Col>
                        <h2>Danh sách sản phẩm</h2>
                    </Col>
                    <ControlSearch />
                </Row>
                <hr />
                <Row>
                    {elmProducts}
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products : state.products,
        keyword : state.search,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllItems : () => {
            dispatch(actions.listAllRequest());
        },
        onAddToCart : (item) => {
            dispatch(actions.addToCart(item))
        }
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(ProductListShowContainer);