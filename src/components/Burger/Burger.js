import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
    //to convert object into array, this contains only the keys of obj
    const transformedIngredients = Object.keys(props.ingredients);
    console.log(transformedIngredients);

    //obj key(name of ig) is passed to map to
    // return w/ new array of length of each key's value respectively.
    const transformedIngredients2 = transformedIngredients.map(igKey => {
        console.log(props.ingredients[igKey]); //key's value as array length

        // the length of each array is important not the elem
        //spread has stripped them out of Array(). the undefined array items are inside a new array.
        return[...Array(props.ingredients[igKey])]
        //The map() iterates for each empty array item based on length(no of times ig needed).
        .map((_, index) => {
            return <BurgerIngredient key={igKey + index} type={igKey} />
        });
    });

    console.log(transformedIngredients2);


    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients2}
            <BurgerIngredient type="bread-bottom"/>
        </div>
        );
};

export default burger;