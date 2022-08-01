import React, { Component } from 'react'
import { Interweave } from 'interweave';
import Price from './Price';


export class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: this.props.item,
            currantImage: 0,
            errorFields: [],
        }
        this.updateImage = this.updateImage.bind(this)
    }


    updateImage(index) {
        this.setState({ currantImage: index })
    }

    //check if user entered all values for attributes
    checkAttributes(item) {
        let isValid = true
        let errorFields = []
        if (!item.inStock) {
            isValid = false
        } else {
            Object.keys(this.state.attributes).forEach((key) => {
                //if any attribute is not filled, page will return error
                if (this.state.attributes[key] === null) {
                    isValid = false
                    errorFields.push(key)
                }
            });
            this.setState({ errorFields: errorFields })
        }
        return isValid
    }

    componentDidMount() {
        let attributes = {}
        this.state.item.attributes.forEach((attribute)=>{
            attributes[attribute.name] = null
        })
        this.setState({
            attributes: attributes
        })
    }

    //sumbit item to order
    handleSubmit = (event, item) => {
        event.preventDefault()
        if (this.checkAttributes(item)) {
            const orderItem = JSON.parse(JSON.stringify(item))
            orderItem.attributes.forEach((attribute) => {
                const selectedValue = this.state.attributes[attribute.name]
                attribute.userValue = selectedValue
            })
            this.props.addItemToOrder(orderItem)
        }
    }

    //when user selects attributes value its automatically inserts to state
    handleInputChange = (event) => {
        this.setState(prevState => ({
            attributes: {
                ...prevState.attributes,
                [event.target.name]: event.target.value
            }
        }))

    }

    render() {
        const item = this.state.item
        return (
            <main className='pdp' key={item.id}>
                <form onSubmit={(event) => this.handleSubmit(event, item)} className="row">
                    <div className='pictures'>
                        {
                            item.gallery.map((picture, index) => {
                                return (
                                    <div className='item-picture-dpd' key={index} onClick={() => this.updateImage(index)}>
                                        <img src={picture} className="img-fluid" alt={picture} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={`item-card ${item.inStock ? '' : 'unavailable'}`} style={{
                        backgroundImage: `url(${item.gallery[this.state.currantImage]})`
                    }}>
                        {!item.inStock &&
                            <div className='unavailable-label'>OUT OF STOCK</div>
                        }
                    </div>
                    <div className='item-info'>
                        <div className='info-heading'>
                            <div className='heading-main'>
                                {item.brand}
                            </div>
                            <div className='heading-seconadry'>
                                {item.name}
                            </div>
                        </div>
                        {
                            item.attributes.map((attribute) => {
                                return (
                                    <div className='attribute' key={attribute.id}>
                                        <div className='attribute-name'>
                                            {attribute.name}
                                            {this.state.errorFields.includes(attribute.name) ? (
                                                <span className='error'> (Select value) </span>
                                            ) : null} :
                                        </div>
                                        <div className='attribute-values'>
                                            {
                                                attribute.items.map((item, index) => {
                                                    switch (attribute.name) {
                                                        case "Size":
                                                            return (
                                                                <div key={`dpd ${item.id} ${index}`}>
                                                                    <input name={attribute.name} type="radio" id={`${attribute.name} ${index}`} value={item.value} className='input-size input-hidden' onChange={this.handleInputChange} />
                                                                    <label htmlFor={`${attribute.name} ${index}`} className={`attribute-value ${attribute.name}`}>{item.value}</label>
                                                                </div>
                                                            )
                                                        case "Color":
                                                            return (
                                                                <div key={`dpd ${item.id} ${index}`}>
                                                                    <input name={attribute.name} type="radio" id={`${attribute.name} ${index}`} value={item.value} className='input-color input-hidden' onChange={this.handleInputChange} />
                                                                    <label htmlFor={`${attribute.name} ${index}`} className={`attribute-value ${attribute.name}`} style={{ backgroundColor: item.value }}></label>
                                                                </div>
                                                            )
                                                        default:
                                                            return (
                                                                <div key={`dpd ${item.id} ${index}`}>
                                                                    <input name={attribute.name} type="radio" id={`${attribute.name} ${index}`} value={item.value} className='input-size input-hidden' onChange={this.handleInputChange} />
                                                                    <label htmlFor={`${attribute.name} ${index}`} className='attribute-value default'>{item.displayValue}</label>
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
                        <div className='price-info'>
                            <div className='attribute-name'>
                                Price:
                            </div>
                            <div className='price-amount'>
                                <Price currency={this.props.currency} item={item} />
                            </div>
                        </div>
                        <button className='add-to-cart-button' disabled={!item.inStock}>
                            ADD TO CART
                        </button>
                        <div className='item-description'>
                            <Interweave content={item.description} />
                        </div>
                    </div>
                </form>
            </main>
        )
    }
}

export default Form