import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import './ProductManagementContainer.css';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import ProductForm from './components/ProductForm';
import Control from './../../components/Control/Control';
import ProductList from './components/ProductList';
import {toggleForm} from './../../actions/index';
import { connect } from 'react-redux';

class ProductManagementContainer extends Component {

    render() {
        const {isDisplayForm} = this.props;
        var elmProductFrom = isDisplayForm ? <ProductForm onChangeDisplay={this.props.onChangeDisplay} isDisplayForm={isDisplayForm} /> : '';
        var elmProductCreate = isDisplayForm ? '' : <Button onClick={this.props.onChangeDisplay} color="primary" size="lg">
        <FontAwesomeIcon icon={faPlusSquare} /> &nbsp;
        Thêm sản phẩm
        </Button> ;
        return (
            <Container>
                <div className="text-center">
                    <h1>Quản lý sản phẩm</h1>
                    <hr />
                </div>
                <Row>
                    {elmProductFrom}
                    <Col>
                        {elmProductCreate}
                        <Control/>
                        <ProductList/>
                    </Col>
                </Row>
            </Container>
        )
    }
}


const mapStateToProps = state => {
    return{
        isDisplayForm :  state.isDisplayForm
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return{
        onChangeDisplay : () => {
            dispatch(toggleForm());
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductManagementContainer);