import React, { Component } from 'react'

export class Price extends Component {
    render() {
        const item = this.props.item
        return (
            <div>
                {
                    item.prices.map(({ amount, currency }) => {
                        if (currency.symbol === this.props.currency) return (
                            <span className='price' key={item.id}>
                                {currency.symbol} {amount}
                            </span>
                        );
                    })
                }
            </div>
        )
    }
}

export default Price