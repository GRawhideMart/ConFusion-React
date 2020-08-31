import { COMMENTS } from '../shared/comments';
import * as Actions from './ActionTypes';

/* This reducer contains the INITIAL comments. This IS NOT the action creator */
export const Comments = (state = COMMENTS, action) => {
    switch(action.type) {
        case Actions.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.length // New comment id is the last present + 1. In array terms, this means length (0-indexing)
            comment.date = new Date().toISOString(); // Date automatically gets assigned to now.
            console.log('Comment: ' + comment);
            return state.concat(comment);
        default:
            return state;
    }
}