import * as Actions from './ActionTypes';

export const Leaders = (state = {
    isLoading: true,
    errmess: null,
    leaders: []
}, action) => {
    switch(action.type) {
        case Actions.LEADERS_FAILED:
            return {...state, isLoading: false, errmess: action.payload};
        
        case Actions.LEADERS_LOADING:
            return {...state, isLoading: true};
        
        case Actions.ADD_LEADERS:
            return {...state, isLoading: false, leaders: action.payload};
            
        default:
            return state;
    }
}