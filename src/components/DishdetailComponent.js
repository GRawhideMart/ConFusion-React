import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
    }

    renderDish(dish) {
        return(
            <Card>
                <CardImg width='100%' src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Card>
        );
    }

    render() {
        const dish = this.props.dish;

        if(dish == null) return(<div></div>);
        return(
            <div className='row'>
            <div className='col-12 col-md-5 mt-1'>
                {this.renderDish(dish)}
            </div>
            <div className='col-12 col-md-5 mt-1'>
                
            </div>
        </div>
        )
    }
}

export default DishDetail;