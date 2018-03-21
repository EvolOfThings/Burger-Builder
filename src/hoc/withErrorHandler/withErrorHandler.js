import React, { Component, Fragment}from 'react';

import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        }

        componentDidMount () {
            axios.interceptors.request.use(req => {
                this.setState({error: null}); //to get rid off error(from prev state) when sending a req
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error}); // state error is set to the error that we get from firebase
            });
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Fragment>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    }
}


export default withErrorHandler;

