import * as Actions from './ActionTypes';

import { baseUrl } from '../shared/baseUrl';

/* The action creator defines the logic of the action. This is the place to define what "add comment" means */

export const addComment = (comment) => ({
    type: Actions.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };

    newComment.date = new Date().toISOString(); // Date automatically gets assigned to now.

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
           .then(response => {
               if(response.ok) return response;
               else {
                   var error = new Error('Error ' + response.status + ': ' + response.statusText);
                   error.response = response;
                   throw error;
               }
           }, error => {
               var errmess = new Error(error.message);
               throw errmess;
           })
           .then(response => response.json())
           .then(response => dispatch(addComment(response)))
           .catch(error => {
               console.log('post comments', error.message);
               alert('Cannot post comment\n' + error.message);
           });
}

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
           .then(response => {
               if(response.ok) return response;
               else {
                   var error = new Error('Error ' + response.status + ': ' + response.statusText);
                   error.response = response;
                   throw error;
               }
           }, error => {
               var errmess = new Error(error.message);
               throw errmess;
           })
           .then(response => response.json())
           .then(dishes => dispatch(addDishes(dishes)))
           .catch(error => dispatch(dishesFailed(error.message)));
};

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
           .then(response => {
               if(response.ok) return response;
               else {
                   var error = new Error('Error ' + response.status + ': ' + response.statusText);
                   error.response = response;
                   throw error;
               }
           }, error => {
               var errmess = new Error(error.message);
               throw errmess;
           })
           .then(response => response.json())
           .then(comments => dispatch(addComments(comments)))
           .catch(error => dispatch(commentsFailed(error.message)));
};

export const addComments = (comments) => ({
    type: Actions.ADD_COMMENTS,
    payload: comments
});

export const commentsFailed = (errmess) => ({
    type: Actions.COMMENTS_FAILED,
    payload: errmess
})

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

    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
           .then(response => {
               if(response.ok) return response;
               else {
                   var error = new Error('Error ' + response.status + ': ' + response.statusText);
                   error.response = response;
                   throw error;
               }
           }, error => {
               var errmess = new Error(error.message);
               throw errmess
           })
           .then(response => response.json())
           .then(promos => dispatch(addPromos(promos)))
           .catch(error => dispatch(promosFailed(error.message)))
};

export const leadersFailed = (errmess) => ({
    type: Actions.LEADERS_FAILED,
    payload: errmess
});

export const leadersLoading = () => ({
    type: Actions.LEADERS_LOADING
});

export const addLeaders = (leaders) => ({
    type: Actions.ADD_LEADERS,
    payload: leaders
});

export const fetchLeaders = () => (dispatch) => {
    return fetch(baseUrl + 'leaders')
           .then(response => {
               if(response.ok) return response;
               else {
                   var error = new Error('Error ' + response.status + ': ' + response.statusText);
                   error.response = response;
                   throw error;
               }
           }, error => {
               var errmess = new Error(error.message);
               throw errmess;
           })
           .then(response => response.json())
           .then(response => dispatch(addLeaders(response)))
           .catch(error => dispatch(leadersFailed(error.message)));
};