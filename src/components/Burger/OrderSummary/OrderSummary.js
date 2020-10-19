import React, {Component} from 'react';

import Aux from '../../../HOC/Auxiliary/Auxiliary';
import Button  from '../../UI/Button/Button';
import classes from './OrderSummary.css';

class OrderSummary extends Component  {
    componentDidUpdate () {
        console.log('[OrderSummary] componentDiUpdate')
    }

    render() {
        let ingredientSummary = Object.keys(this.props.ingredients)
        .map(item => {
            return (
            <li key ={item} >
                <span style={{textTransform: 'capitalize'}}>{item}</span> : {this.props.ingredients[item]} 
            </li>)
    })
        return (
            <Aux>
                <h3 className={classes.OrderCaption}>Your Order</h3>
                <p>A delicious burger with the folowing ingrediens: </p>
                <ul className={classes.OrderList}>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked ={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked ={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        ); 
    }
    
}

export default OrderSummary;