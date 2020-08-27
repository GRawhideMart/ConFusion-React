import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish({dish}) {
    return(
        <div className='col-12 col-md-5 m-1'>
            <Card>
                <CardImg width='100%' src={dish.image} alt={dish.name} />
            </Card>
        </div>
    );
}

function RenderComments({comments}) {
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
    const comments = props.comments;

    return(
        <div className='container'>
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className='col-12'>
                    <h3>{dish.name}</h3>
                    <hr/>
                </div>
            </div>
            <div className='row'>
                <RenderDish dish={dish} />
                <RenderComments comments={comments} />
            </div>
        </div>
        
    )
}

export default DishDetail;