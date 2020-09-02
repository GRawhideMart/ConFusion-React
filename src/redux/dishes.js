import * as Actions from './ActionTypes';

export const Dishes = (state = {
    isLoading: true,
    errmess: null,
    dishes: []
}, action) => {
    switch(action.type) {
        case Actions.ADD_DISHES:
            return {
                ...state,
                isLoading: false,
                dishes: action.payload
            };
        
        case Actions.DISHES_LOADING:
            return {
                ...state
            };

        case Actions.DISHES_FAILED:
            return {
                ...state,
                isLoading: false,
                errmess: action.payload
            };

        default:
            return state;
    }
}