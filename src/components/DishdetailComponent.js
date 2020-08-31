import React, { Component } from 'react';
import { Card, CardImg, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    render() {
        return(
            <div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                </Modal>

                <Button outline onClick={this.toggleModal}>
                    <span className='fa fa-lg fa-pencil'></span> Submit Comment
                </Button>
            </div>
        );
    }
}

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
    if(comments == []) return(<div><CommentForm /></div>)
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
            <CommentForm />
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