import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label:'Salad', type: 'salad'},
    { label:'Cheese', type: 'cheese'},
    { label:'Meat', type: 'meat'},
    { label:'Bacon', type: 'bacon'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price:<strong> &#8377; {props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemove(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
        ))}<button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>Order Now</button>
    </div>
    );

export default buildControls;