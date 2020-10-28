import React, { Component } from 'react';

import Aux from '../../HOC/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
const INGREDIENT_PRICES = {
    salad: 0.5,
    tomato: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    constructor (props) {
        super(props);
        this.state = {
            ingredients: null,
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
            loading: false,
            errror: false
        }
    }

    componentDidMount() {
        axios.get('https://burger-app-bc878.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data})
        })
        .catch(error => {
            this.setState({error: true})
        })
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.values(ingredients)
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0})
    }

    addIngreduentHadler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;  
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENT_PRICES[type];

        this.setState ({ingredients : updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngreduentHadler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;  
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENT_PRICES[type];

        this.setState ({ingredients : updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients)
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler =() => {
        // alert("You continue!");
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })

    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {            
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        
        let burger = this.state.error ? <p>The ingredients can`t be fetched</p> :<Spinner /> 
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients ={this.state.ingredients}/>
                    <BuildControls 
                        price = {this.state.totalPrice}
                        ingredientAdded ={this.addIngreduentHadler} 
                        ingredientRemoved ={this.removeIngreduentHadler}
                        disabled = {disabledInfo}
                        purchasable = {this.state.purchasable}
                        ordered = {this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary
            price ={this.state.totalPrice} 
                    ingredients = {this.state.ingredients}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler} />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed ={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);