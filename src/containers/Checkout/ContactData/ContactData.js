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
                elementType: 'input',  //you could write a function that creates this and just call it
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '', //value that's shown on the screen
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorValue: 'full name'
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorValue: 'street address'
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 6
                },
                valid: false,
                touched: false,
                errorValue: 'zipcode'
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorValue: 'country'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorValue: 'email address'
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                    {value: 'normal', displayValue: 'Delivery : Normal'},
                    {value: 'premium', displayValue: 'Delivery : Premium'}
                    ]
                },
                value: '',
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        //form has a default behavior of reloading the page
        event.preventDefault();
        //console.log(this.props.ingredients);
        this.setState({loading: true});
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        //'order.json' gets appended to baseURL
        // .json end point need to target for firebase to work correctly
        const order = {
            ingredient: this.props.ingredients,
            price: this.props.price,
            orderData: formData //usually price shld be calculate on the server
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

    checkValidity(value, rules) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid; //isValid is updated depending on value not equal to empty string
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    inputChangeHandler = (event, inputIndentifier) => {
        //this doesnt create deep clone, nested objs wouldn't be cloned
        //the pointers are still there so they will mutate the original state hence further cloning in line 96
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        //cloning the nested object inside the state using id i.e. the key
        const updatedFormElement = {
            ...updatedOrderForm[inputIndentifier]
        };
        //if we are changing  the elementConfig which is nested within nested state then we clone it as above
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIndentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIndentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIndentifier].valid && formIsValid;
        }
        //console.log(updatedFormElement);
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render () {
        const formElementArray =[];
        for (let key in this.state.orderForm) {
             formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
             });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    valueType={formElement.config.errorValue}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangeHandler(event, formElement.id)} />
                    ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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