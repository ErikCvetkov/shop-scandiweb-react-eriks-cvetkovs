import React, { Component } from 'react'

export class Price extends Component {
    render() {
        const item = this.props.item
        return (
            <div>
                {
                    item.prices.map((price) => {
                        if (price.currency.symbol === this.props.currency){ return (
                            <span className='price' key={item.id}>
                                {price.currency.symbol} {price.amount}
                            </span>
                        )}
                    })
                }
            </div>
        )
    }
}

export default Price