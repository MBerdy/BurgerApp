import React from 'react';

import classes from './Order.css'
const order = (props) => {
    let ingredients =[];
    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        ); 
    }
    let allIngredients = ingredients.map (ig => {
        return <span
            className ={ classes.Ingredient}
            key={ig.name}>{ig.name} ({ig.amount})</span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {allIngredients } </p>
            <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
        </div>
    );
}



export default order