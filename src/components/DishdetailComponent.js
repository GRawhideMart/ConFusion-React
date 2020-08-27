import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
    }

    renderDish(dish) {
        return(
            <div className='col-12 col-md-5 m-1'>
                <Card>
                    <CardImg width='100%' src={dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Card>
            </div>
        );
    }

    renderComments(comments) {
        if(comments == []) return(<div></div>)
        return(
            <div className='col-12 col-md-5 m-1'>
                <h4><strong>Comments</strong></h4>
                <ul className='list-unstyled'>
                    {comments.map(eachComment => {
                        return(<p>{eachComment.comment}<br/>
                        -- <em>{eachComment.author}</em>, <span>{new Date(eachComment.date).toLocaleDateString()}</span>
                        </p>)
                    })}
                </ul>
            </div>
        )
    }

    render() {
        const dish = this.props.dish;
        let comments = [];
        (dish == null) ? comments = [] : comments = dish.comments;

        if(dish == null) return(<div></div>);
        return(
            <div className='row'>
                {this.renderDish(dish)}
                {this.renderComments(comments)}
            </div>
        )
    }
}

export default DishDetail;