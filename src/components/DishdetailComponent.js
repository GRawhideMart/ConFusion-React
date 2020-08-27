import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

function RenderDish(dish) {
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

function RenderComments(comments) {
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

const DishDetail = (props) => {    

    const dish = props.dish;
    let comments = [];
    (dish == null) ? comments = [] : comments = dish.comments;
    if(dish == null) return(<div></div>);
    return(
        <div className='row'>
            {RenderDish(dish)}
            {RenderComments(comments)}
        </div>
    )
}

export default DishDetail;