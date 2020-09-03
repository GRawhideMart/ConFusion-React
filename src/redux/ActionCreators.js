import * as Actions from './ActionTypes';

import { baseUrl } from '../shared/baseUrl';

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

    return fetch(baseUrl + 'dishes')
           .then(response => response.json())
           .then(dishes => dispatch(addDishes(dishes)));
};

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
           .then(response => response.json())
           .then(comments => dispatch(addComments(comments)));
};

export const addComments = (comments) => ({
    type: Actions.ADD_COMMENTS,
    payload: comments
});

export const promosLoading = () => ({
    type: Actions.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: Actions.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: Actions.ADD_PROMOS,
    payload: promos
});

export const fetchPromos = () => (dispatch) => {
    return fetch(baseUrl + 'promotions')
           .then(response => response.json())
           .then(promos => dispatch(addPromos(promos)))
};