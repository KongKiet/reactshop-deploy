import {combineReducers} from 'redux';
import products from './products';
import isDisplayForm from './isDisplayForm';
import itemEditing from './itemEditing';
import filterTable from './filterTable';
import search from './search';
import sort from './sort';
import carts  from './carts';

const myReducer = combineReducers({
    products,
    isDisplayForm,
    itemEditing,
    filterTable,
    search,
    sort,
    carts
});

export default myReducer;