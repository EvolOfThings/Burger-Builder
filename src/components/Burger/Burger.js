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
        console.log(igKey); //key
        console.log(props.ingredients[igKey]); //key's value as array length
        return[...Array(props.ingredients[igKey])]
    });

    console.log(transformedIngredients2);


    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            <BurgerIngredient type="cheese"/>
            <BurgerIngredient type="bacon"/>
            <BurgerIngredient type="meat"/>
            <BurgerIngredient type="salad"/>
            <BurgerIngredient type="bread-bottom"/>
        </div>
        );
};

export default burger;