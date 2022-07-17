import React, { Component } from 'react'
import Order from './Order'

export class CartOverview extends Component {
    render() {
        return (
            <main className='cart-overview'>
                <div className='heading'>CART</div>
                {this.props.orders < 1 ? (
                    <div className='name-secondary'>
                        Cart is empty
                    </div>
                ) : (
                    <div className='order-list'>
                        {this.props.orders.map((order, index) => {
                            return (
                                <div className='order'>
                                    <Order updateOrderCount={this.props.updateOrderCount} currency={this.props.currency} el={order} index={index} id={'cartOverview'} />
                                </div>
                            )
                        })
                        }
                        <div className='order-payment'>
                            <div className='payment-tax'>
                                <span className='property'>
                                    Tax 21%:
                                </span>
                                <span className='value'>
                                    {
                                        (Number(this.props.totalSum().split(' ')[0]) * 0.21).toFixed(2) + ' ' + this.props.currency
                                    }
                                </span>
                            </div>
                            <div className='payment-count'>
                                <span className='property'>
                                    Quantity:
                                </span>
                                <span className='value'>
                                    {this.props.getCount()}
                                </span>
                            </div>
                            <div className='payment-tax'>
                                <span className='property'>
                                    Total:
                                </span>
                                <span className='value'>
                                    {this.props.totalSum()}
                                </span>
                            </div>
                            <div className='payment-button'>
                                ORDER
                            </div>
                        </div>
                    </div>

                )}

            </main>
        )
    }
}

export default CartOverview