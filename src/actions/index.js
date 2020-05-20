import * as types from './../constants/ActionTypes';
import axios from 'axios';

export const listAllRequest = () => {
    return(dispatch) => {
        axios.get('https://shopkoki-db.herokuapp.com/productList').then(res => {
            dispatch(listAll(res.data))
        });
    }
};

 export const listAll = (items) => {
    return {
        type : types.LIST_ALL,
        items
    }
 };

export const addItemRequest = (item) => {
    return dispatch => {
        axios.post('https://shopkoki-db.herokuapp.com/productList', item).then(res => {
            dispatch(addItem(res.data))
        });
    }
};

 export const addItem = (item) => {
     return {
         type : types.ADD_ITEM,
         item //item:item
     }
 };
 
export const deleteItemRequest = (id) => {
    return dispatch => {
        axios.delete(`https://shopkoki-db.herokuapp.com/productList/${id}`).then(res => {
            dispatch(deleteItem(id))
        })
    }
};

 export const deleteItem = (id) => {
     return {
         type : types.DELETE_ITEM,
         id
     }
 };

 export const toggleForm = () => {
     return {
         type : types.TOGGLE_FORM
     }
 };

 export const updateStatusRequest = (id, item) => {
     return dispatch => {
        axios.put(`https://shopkoki-db.herokuapp.com/productList/${id}`, item).then(res => {
            dispatch(updateStatus(id))
        })
     }
 };

 export const updateStatus = (id) => {
     return {
         type : types.UPDATE_STATUS,
         id
     }
 };

 export const getItem = (item) => {
     return {
         type : types.GET_ITEM,
         item
     }
 };

 export const onClear = () => {
     return {
         type : types.CLEAR_EDIT
     }
 };
 
 export const updateItemRequest = (id, item) => {
     return dispatch => {
        axios.put(`https://shopkoki-db.herokuapp.com/productList/${id}`, item).then(res => {
            dispatch(updateItem(id, item))
        })
     }
 };

 export const updateItem = (id, item) => {
     return {
        type: types.UPDATE_ITEM,
        id,
        item
     }
 };

 export const filterItem = (filter) => {
     return {
         type: types.FILTER_TABLE,
         filter
     }
 };

 export const searchItem = (keyword) => {
     return {
         type: types.SEARCH,
         keyword
     }
 };

 export const sortItem = (sort) => {
    return {
        type : types.SORT,
        sort
    }
 };

 export const addToCart = (item) => {
     return {
         type : types.ADDTOCART,
         item
     }
 };

 export const deleteCart = (product) => {
     return {
         type : types.DELETE_CART,
         product
     }
 };

 export const deleteAllCart = () => {
     return {
         type : types.DELETE_ALLCART
     }
 };