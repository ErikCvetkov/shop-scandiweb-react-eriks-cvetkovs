import React, { Component } from 'react'
import Price from './Price'

export class Order extends Component {
    render() {
        const el = this.props.el
        const index = this.props.index
        return (
            <div key={`${this.props.id} ${el.id} ${index}`} className="item-order">
                <div className='item-info'>
                    {this.props.id === 'cart' ? (
                        <div className='name'>
                            {el.name}
                        </div>
                    ) : (
                        <div>
                            <div className='name'>
                                {el.name.split(" ")[0]}
                            </div>
                            {el.name.split(" ").length > 1 &&
                                <div className='name-secondary'>
                                    {el.name.substr(el.name.indexOf(" ") + 1)}
                                </div>
                            }
                        </div>
                    )
                    }
                    <div className='price'>
                        <Price currency={this.props.currency} item={el} />
                    </div>
                    {
                        el.attributes.map((product) => {
                            return (
                                <div className='attribute'>
                                    <div className='attribute-name'>
                                        {product.name}:
                                    </div>
                                    <div className='attribute-values row'>
                                        {
                                            product.items.map((item) => {
                                                switch (product.name) {
                                                    case "Size":
                                                        return (
                                                            <div key={`cart ${item.id}`} className={`attribute-value ${product.name} ${item.displayValue === product.userValue ? 'active' : null}`}>
                                                                {item.displayValue}
                                                            </div>
                                                        )
                                                    case "Color":
                                                        return (
                                                            <div key={`cart ${item.id}`} className={`attribute-value ${product.name} ${item.value === product.userValue ? 'active' : null}`} style={{ backgroundColor: item.value }}>
                                                            </div>
                                                        )
                                                    default:
                                                        return (
                                                            <div key={`cart ${item.id}`} className={`attribute-value default ${item.displayValue === product.userValue ? 'active' : ''}`}>
                                                                {item.displayValue}
                                                            </div>
                                                        )
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='group'>
                    <div className='item-count'>
                        <button className='button-count' onClick={() => this.props.updateOrderCount(index, true)}>+</button>
                        <span>{el.count}</span>
                        <button className='button-count' onClick={() => this.props.updateOrderCount(index, false)}>-</button>
                    </div>
                    <div className='item-img' style={{
                        backgroundImage: `url(${el.gallery[0]})`
                    }}></div>
                </div>
            </div>
        )
    }
}

export default Order