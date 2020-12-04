import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import Spinner from './components/UI/Spinner/Spinner';
import Layout from './HOC/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';

const Orders = React.lazy(() => import('./containers/Orders/Orders'))

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  burger: burgerBuilderReducer,
  order: orderReducer
})
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

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
