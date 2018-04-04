import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'normal', displayValue: 'Normal'}
                    ]
                },
                value: ''
            }
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
            price: this.props.price //usually price shld be calculate on the server
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
                <Input elementType="..." elementConfig="..." value="..." />
                <Input inputtype="input" type="email" name="email" placeholder="Your Mail" />
                <Input inputtype="input" type="text" name="street" placeholder="Street" />
                <Input inputtype="input" type="text" name="postal" placeholder="Postal Code" />
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