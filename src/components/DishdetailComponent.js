import React, { Component } from 'react';
import { Card, CardImg, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

export class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            rating: 1,
            author: '',
            comment: ''
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) {
        this.props.addComment(
            this.props.dishId,
            values.rating,
            values.author,
            values.comment
        );
    }
    
    render() {
        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);
        
        return(
            <div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} modalTransition={{ timeout: 250 }} backdropTransition={{ timeout: 250 }}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className='form-group'>
                                <Label htmlFor='rating' md={2}>Rating</Label>
                                <Control.select model='.rating' id='rating'
                                    className='form-control'>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                </Control.select>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor='author' md={2}>Your name</Label>
                                <Control.text model='.author' id='author' 
                                              className='form-control'
                                              validators={{
                                                  required,
                                                  minLength: minLength(2),
                                                  maxLength: maxLength(15)
                                              }}/>
                                <Errors
                                    className='text-danger'
                                    model='.author'
                                    show='touched'
                                    messages={{
                                        required: 'Required\n',
                                        minLength: 'Must be longer than 2 characters',
                                        maxLength: 'Must be shorter than 15 characters'
                                    }}/>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor='comment' md={2}>Your comment</Label>
                                <Control.textarea model='.comment' id='comment' />
                            </Row>
                            <Row className='form-group'>
                                <Col md={{
                                    size: 10,
                                    offset: 2
                                }}>
                                    <Button type='submit' color='primary'>Submit Comment</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
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
                <CardImg width='100%' src={baseUrl + dish.image} alt={dish.name} />
            </Card>
        </div>
    );
}

function RenderComments({comments, addComment, dishId}) {
    if(comments === []) return(<div><CommentForm /></div>)
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
            <CommentForm dishId={dishId} addComment={addComment} />
        </div>
    )
}

const DishDetail = (props) => {    
    
    const dish = props.dish;
    const comments = props.comments;
    const addComment = props.addComment;

    if(props.dishesLoading) {
        return(
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        )
    } else if (props.dishesErrMess) {
        return(
            <div className='container'>
                <div className='row'>
                    <h4>{props.errmess}</h4>
                </div>
            </div>
        )
    } else {
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
                    <RenderComments 
                        comments={comments} 
                        addComment={addComment}
                        dishId={dish.id} />
                </div>
            </div>   
        )
    }
}

export default DishDetail;