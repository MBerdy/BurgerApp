import React from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import * as action from '../../store/actions/index';

class Orders extends React.Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId)
    }
    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.orders.map(o => {
                return <Order
                    key={o.id}
                    ingredients={o.ingredients}
                    price={+ o.price} />
            });
        }
        return (
            <div>
                {orders}        
            </div>
        );
    }
}
 const mapStateToProps = (state) => {
     return {
         orders: state.order.orders,
         loading: state.order.loading,
         token: state.auth.token,
         userId: state.auth.userId
     }
 }

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(action.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(Orders, axios));