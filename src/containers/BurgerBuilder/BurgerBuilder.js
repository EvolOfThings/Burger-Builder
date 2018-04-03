import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import {Route} from 'react-router-dom';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const   INGREDIENT_PRICES = {
    salad: 20,
    cheese: 30,
    meat: 45,
    bacon: 40
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 15,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        console.log(this.props);
        axios.get('https://react-burger-builder-5bd83.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            this.setState({error: true});
        });
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, individualElement) => {
                return sum + individualElement;
            }, 0);
            //console.log(sum);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        //console.log(updatedIngredients);
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        //so the order button is enabled/disabled after changing ig.
        //updatedIngredients is passed so that we get the latest state, not initial
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        //console.log(updatedIngredients);
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        //so the order button is enabled/disbled after changing ig
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        //alert('web server is not yet setup.');
        // this.setState({loading: true});
        // //'order.json' gets appended to baseURL
        // // .json end point need to target for firebase to work correctly
        // const order = {
        //     ingredient: this.state.ingredients,
        //     price: this.state.totalPrice, //usually price shld be calculate on the server
        //     customer: {
        //         name: 'Rishad',
        //         address: {
        //             street: 'Nada St',
        //             zipCode: '4523232',
        //             country: 'India'
        //         },
        //         email: 'testing@tester.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false, purchasing: false});
        //     })
        //     .catch(error => {
        //         this.setState({loading: false});
        //     });
        this.props.history.push('/checkout');
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 // {salad: true, meat: false, ...}
        }

        let orderSummary = null;
        //since we are fetching the ingre from backend, Burger and BuildControls fail so we set spinner till we get ig
        let burger = this.state.error ? <p>Ingredients can't be loaded</p>: <Spinner />

        if(this.state.ingredients) {
            burger = (
            <Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemove={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}/>
            </Fragment>
            );
            orderSummary =  <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice} />;
        }
        if(this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Fragment>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
            </Modal>
            {burger}
            </Fragment>
            );
    }
    }



export default withErrorHandler(BurgerBuilder, axios);

