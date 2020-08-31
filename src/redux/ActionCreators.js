import * as Actions from './ActionTypes';

/* The action creator defines the logic of the action. This is the place to define what "add comment" means */

export const addComment = (dishId, rating, author, comment) => ({
    type: Actions.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});