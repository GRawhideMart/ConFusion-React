import { COMMENTS } from '../shared/comments';
import * as Actions from './ActionTypes';

/* This reducer contains the INITIAL comments. This IS NOT the action creator */
export const Comments = (state = {
    comments: [],
    errmess: null
}, action) => {
    switch(action.type) {
        case Actions.ADD_COMMENT:
            var comment = action.payload;
            console.log('Comment: ' + comment);
            return {...state, comments: state.comments.concat(comment)};

        case Actions.ADD_COMMENTS:
            return {...state, comments: action.payload};

        
        default:
            return state;
    }
}