import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Spinner from './components/UI/Spinner/Spinner';
import Layout from './HOC/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';

const Orders = React.lazy(() => import('./containers/Orders/Orders'))

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" render ={() => (
                <React.Suspense fallback ={<Spinner />}>
                  <Orders />
                </React.Suspense>
              )} />
              <Route path="/" component={BurgerBuilder} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
