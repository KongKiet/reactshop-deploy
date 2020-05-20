import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './../ProductManagementContainer.css';
import { Button} from 'reactstrap';
import {connect} from 'react-redux';
import {deleteItemRequest} from '../../../actions/index';
import {updateStatusRequest} from '../../../actions/index';
import {toggleForm} from '../../../actions/index';
import {getItem} from '../../../actions/index';


class ProductListItem extends Component {

    onDelete = () => {
        this.props.deleteItem(this.props.product.id)
    };

    openForm = () => {
        this.props.onGetItem(this.props.product);

        if(!this.props.isDisplayForm) {
            this.props.onToggleForm()
        }
    };

    onUpdateStatus = () => {
        var item = {
            id : this.props.product.id,
            name : this.props.product.name,
            price : this.props.product.price,
            imageUrl : this.props.product.imageUrl,
            status : !this.props.product.status,
        }
        this.props.updateStatus(this.props.product.id, item)
    }

    render() {
        const {product, index} = this.props
        return (
            <tr>
                <th scope="row">{index}</th>
                <td>{product.name}</td>
                <td>
                     <Button onClick={this.onUpdateStatus} color={product.status === true ? 'success' : 'danger'} size="sm">{product.status === true ? 'Còn hàng' : 'Hết hàng'}</Button>
                </td>
                <td className="text-center">
                    <Button onClick = {this.openForm} color="success">Sửa</Button> &nbsp;
                    <Button onClick = {this.onDelete} color="danger">Xóa</Button>
                </td>
            </tr>
        )
    }

    
}

const mapStateToProps = state => {
    return{
        isDisplayForm :  state.isDisplayForm
    }
};


const mapDispatchToProps = (dispatch, props) => {
    return {
        deleteItem : (id) => {
            dispatch(deleteItemRequest(id))
        },
        updateStatus :(id, item) => {
            dispatch(updateStatusRequest(id, item))
        },
        onToggleForm : () => {
            dispatch(toggleForm());
        },
        onGetItem : (item) => {
            dispatch(getItem(item));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductListItem);