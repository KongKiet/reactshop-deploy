import * as types from '../constants/ActionTypes';

var findIndex = (products, id) => {
    var result = -1;
    products.forEach((products, index) => {
        if(products.id === id) {
            result = index;
        }
    });
    return result;
}

var initialState = [];

var myReducer  = (state = initialState, action) => {
    switch(action.type) {
        case types.LIST_ALL:
            state = action.items;
            return [...state];
        
        case types.ADD_ITEM:
            state.push(action.item);
            return [...state];

        case types.DELETE_ITEM:
            var id = action.id;
            var index = findIndex(state, id);
            state.splice(index, 1);
            return [...state];

        case types.UPDATE_STATUS:
            var ids = action.id;
            var indexs = findIndex(state, ids);
            state[indexs] = {
                ...state[indexs],
                status: !state[indexs].status
            };
            return [...state];

        case types.UPDATE_ITEM :
            var id_update = action.id;
            var index_update = findIndex(state, id_update);
            var item = action.item;
            state[index_update] = {
                id : item.id,
                name : item.name,
                price : item.price,
                imageUrl : item.imageUrl,
                status : item.status
            }
            return [...state];

        default:
            return [...state];
    }
};

export default myReducer;