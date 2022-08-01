import React, { Component } from 'react'

export class Price extends Component {
    render() {
        const item = this.props.item
        return (
            <div>
                {
                    item.prices.map((price) => {
                        return price.currency.symbol === this.props.currency ? (
                            <span className='price' key={item.id}>
                                {price.currency.symbol} {price.amount}
                            </span>
                        ) : null
                    })
                }
            </div>
        )
    }
}

export default Price