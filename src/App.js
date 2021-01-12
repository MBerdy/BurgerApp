import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from './components/UI/Spinner/Spinner';
import Layout from './HOC/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const Orders = React.lazy(() => import('./containers/Orders/Orders'))



class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render() {
    console.log('isAuth', this.props.isAuth);

    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" render={() => (
            <React.Suspense fallback={<Spinner />}>
              <Orders />
            </React.Suspense>
          )} />
          <Route path='/logout' component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />

        </Switch>
      )
    }


    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
