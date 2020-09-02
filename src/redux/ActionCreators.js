import * as Actions from './ActionTypes';
import { DISHES } from '../shared/dishes';

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

export const dishesLoading = () => ({
    type: Actions.DISHES_LOADING
});

export const addDishes = (dishes) => ({
    type: Actions.ADD_DISHES,
    payload: dishes
});

export const dishesFailed = (errmess) => ({
    type: Actions.DISHES_FAILED,
    payload: errmess
});

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true)); // dishesLoading is an action, so to use it we have to dispatch it.

    setTimeout(() => {
        dispatch(addDishes(DISHES));
    },2000);
}