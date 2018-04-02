import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

import {BrowserRouter} from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div>
            <Layout>
              <BurgerBuilder />
              <Checkout />
            </Layout>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
