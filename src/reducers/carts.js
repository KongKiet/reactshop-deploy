import * as types from './../constants/ActionTypes';

var findIndexItem = (carts, item) => {
    var result = -1;
    carts.forEach((carts, index) => {
        if(carts.product.id === item.id) {
            result = index;
        }
    });
    return result;
}
 

var data = JSON.parse(localStorage.getItem('items'));
var initialState = data ? data : [];

var myReducer  = (state = initialState, action) => {
    switch(action.type) {
        case types.ADDTOCART:
            let index = findIndexItem(state, action.item);
            if (index === -1) {
                let objCart = {
                    product : action.item,
                    count : 1
                };
                state.push(objCart)
            } else {
                state[index] = {
                    ...state[index],
                    count : state[index].count + 1
                }
            }
            localStorage.setItem('items', JSON.stringify(state));
            console.log(state);
            return [...state];

        case types.DELETE_CART :
            let indexx = findIndexItem(state, action.product);
            if (state[indexx].count === 1){
                state.splice(indexx, 1);
            } else {
                state[indexx] = {
                    ...state[indexx],
                    count : state[indexx].count - 1
                }
            }
            localStorage.setItem('items', JSON.stringify(state));
            return [...state];

        case types.DELETE_ALLCART : 
            state.splice(0);
            localStorage.setItem('items', JSON.stringify(state));
            return [...state];
        
        default:
            return [...state];
    }
};

export default myReducer;