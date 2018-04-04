import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        //form has a default behavior of reloading the page
        event.preventDefault();
        //console.log(this.props.ingredients);
        this.setState({loading: true});
        //'order.json' gets appended to baseURL
        // .json end point need to target for firebase to work correctly
        const order = {
            ingredient: this.props.ingredients,
            price: this.props.price, //usually price shld be calculate on the server
            customer: {
                name: 'Rishad',
                address: {
                    street: 'Nada St',
                    zipCode: '4523232',
                    country: 'India'
                },
                email: 'testing@tester.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                //to redirect after ordering, but we can't use this here w/o some modification in Checkout compo render method
                //bcuz of the way v r loading data i.e. rendering manually using render method in the Checkout compo
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render () {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
            );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter you Contact Details</h4>
                {form}
            </div>
            );
    }

}

export default ContactData;