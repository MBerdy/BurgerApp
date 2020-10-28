import React from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';

class Orders extends React.Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                console.log(fetchedOrders)
                this.setState({ loading: false, orders: fetchedOrders })
            })
            .catch(err => {
                this.setState({ loading: false })

            })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(o => {
                    return <Order
                        key={o.id}
                        ingredients={o.ingredients}
                        price={+o.price} />
                })}
            </div>

        );
    }
}

export default withErrorHandler(Orders, axios);