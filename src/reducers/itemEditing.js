import * as types from './../constants/ActionTypes';

var initialState = {
    id : '',
    name : '',
    imageUrl : '',
    status : false
};

var myReducer  = (state = initialState, action) => {
    switch(action.type) {
        case types.GET_ITEM:
            state = action.item;
            return state;

        case types.CLEAR_EDIT:
            var emty = {
                id : '',
                name : '',
                price : '',
                imageUrl : '',
                status : true
            }
            state = emty;
            return state;

        default:
            return state;
    }
};

export default myReducer;