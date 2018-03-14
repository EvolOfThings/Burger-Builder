import React, {Component, Fragment} from 'react';

import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    // This could be a functional component, doesn't have to be a class Component
    componentWillUpdate() {
        console.log('[OrderSummary] WillUpdate');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li> );
            });

        return (
            <Fragment>
                <h3>Order Summary</h3>
                <p>Your Burger Ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price : &#8377; {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout ?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Fragment>
            );
    }
}

export default OrderSummary;