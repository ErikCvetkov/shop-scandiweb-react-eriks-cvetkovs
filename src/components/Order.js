import React, { Component } from 'react'
import Price from './Price'

export class Order extends Component {
    constructor(props){
        super(props)
        this.state = {
            currantImage: 0
        }
        this.switchImage = this.switchImage.bind(this)
    }
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
                        backgroundImage: `url(${el.gallery[this.state.currantImage]})`
                    }}>
                        {this.props.id === 'cartOverview' &&
                            <div className='switcher'>
                                <button className='switcher-button' onClick={()=>this.switchImage('left')}>
                                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.25 1.06857L1.625 6.6876L7.25 12.3066" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                                <button className='switcher-button' onClick={()=>this.switchImage('right')}>
                                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.75 1.06808L6.375 6.68711L0.75 12.3062" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
    switchImage(move){
        let imageCount = this.props.el.gallery.length
        if (move === 'left' && this.state.currantImage !== 0){
            this.setState({currantImage: this.state.currantImage - 1})
        } else if (move === 'left' && this.state.currantImage === 0){
            this.setState({currantImage: imageCount-1})
        } else if (move === 'right' && this.state.currantImage !== imageCount-1){
            this.setState({currantImage: this.state.currantImage + 1})
        } else if (move === 'right' && this.state.currantImage === imageCount-1) {
            this.setState({currantImage: 0})
        }
    }
}

export default Order