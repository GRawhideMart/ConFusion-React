import * as Actions from './ActionTypes';

export const Promotions = (state = {
    isLoading: true,
    errmess: null,
    promotions: []
}, action) => {
    switch(action.type) {
        case Actions.PROMOS_LOADING:
            return {...state, isLoading: true};
        
        case Actions.PROMOS_FAILED:
            return {...state, errmess: action.payload};

        case Actions.ADD_PROMOS:
            return {...state, promotions: action.payload, isLoading: false};

        default:
            return state;
    }
}