import React, {Fragment} from 'react';

import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li> );
        });
    return (
    <Fragment>
        <h3>Order Summary</h3>
        <p>Your Burger Ingredients:</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p><strong>Total Price : &#8377; {props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout ?</p>
        <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </Fragment>
)};

export default orderSummary;