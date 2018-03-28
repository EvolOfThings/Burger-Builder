import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {BrowserRouter} from 'react-route-dom';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div>
            <Layout>
              <BurgerBuilder />
            </Layout>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
