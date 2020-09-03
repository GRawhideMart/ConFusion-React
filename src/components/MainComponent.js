import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes, // the value of dishes is fetched by redux from the mapped reducer when creating the store
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    postComment: (dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment)),
    fetchDishes: () => dispatch(fetchDishes()),
    resetFeedbackForm: () => dispatch(actions.reset('feedback')),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos())
    });

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    };

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    };

    render() {

        const DishWithId = ({ match }) => {
            return(
                <DishDetail dish={this.props.dishes.dishes.filter(dish => dish.id === parseInt(match.params.dishId))[0]}
                            dishesLoading={this.props.dishes.isLoading}
                            dishesErrMess={this.props.dishes.errmess}
                            comments={this.props.comments.comments.filter(comment => comment.dishId === parseInt(match.params.dishId))} 
                            postComment={this.props.postComment} 
                            commentsErrMess={this.props.comments.errmess} />
            )  
        }

        const HomePage= () => {
            return(
                <Home
                    dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errmess}
                    promotion={this.props.promotions.promotions.filter(promo => promo.featured)[0]}
                    promotionsLoading={this.props.promotions.isLoading}
                    promotionsErrMess={this.props.promotions.errmess}
                    leader={this.props.leaders.filter(leader => leader.featured)[0]}
                />
            );
        }

        return(
            <div>
                <Header />
                    <TransitionGroup>
                        <CSSTransition key={this.props.location.key} classNames='page' timeout={300}>
                            <Switch>
                                <Route path='/home' component={HomePage} />
                                <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                                <Route path='/menu/:dishId' component={DishWithId} />
                                <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
                                <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                                <Redirect to='/home' />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                <Footer />
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));