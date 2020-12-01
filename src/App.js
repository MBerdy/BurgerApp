import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore} from 'redux';

import Spinner from './components/UI/Spinner/Spinner';
import Layout from './HOC/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import reducer from './store/reducer';

const Orders = React.lazy(() => import('./containers/Orders/Orders'))

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <div>
        <Provider store ={store}>
          <BrowserRouter>
            <Layout>
              <Switch>
                <Route path="/checkout" component={Checkout} />
                <Route path="/orders" render={() => (
                  <React.Suspense fallback={<Spinner />}>
                    <Orders />
                  </React.Suspense>
                )} />
                <Route path="/" component={BurgerBuilder} />
              </Switch>
            </Layout>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
