import React, { Component } from 'react'
import withRouter from './withRouter';
import Price from './Price';

export class PDP extends Component {
  constructor(props) {
    super(props)
    const item = this.props.params.location.state.item
    this.state = {
      currantImage: 0,
      inStock: item.inStock,
      item: item,
      attributes: {},
      errorFields: []
    }
    this.updateImage = this.updateImage.bind(this)
  }

  updateImage(index) {
    this.setState({ currantImage: index })
  }

  checkAttributes() {
    let isValid = true
    let errorFields = []
    if (!this.state.inStock) {
      isValid = false
    } else {
      Object.keys(this.state.attributes).map((key) => {
        if (this.state.attributes[key] === null) {
          isValid = false
          errorFields.push(key)
        }
      });
      this.setState({ errorFields: errorFields })
    }
    return isValid
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (this.checkAttributes()) {
      const orderItem = JSON.parse(JSON.stringify(this.state.item))
      orderItem.attributes.map((attribute) => {
        const selectedValue = this.state.attributes[attribute.name]
        attribute.userValue = selectedValue
        delete attribute.items
      })
      this.props.addItemToOrder(orderItem)
    }
  }

  componentDidMount() {
    this.state.item.attributes.map((attribute) => {
      this.setState(prevState => ({
        attributes: {
          ...prevState.attributes,
          [attribute.name]: null
        }
      }))

    })
  }


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
      <main className='pdp'>
        <form onSubmit={this.handleSubmit} className="row">
          <div className='pictures'>
            {
              item.gallery.map((picture, index) => {
                return (
                  <div className='item-picture-dpd' key={index} onClick={() => this.updateImage(index)}>
                    <img src={picture} className="img-fluid" />
                  </div>
                )
              })
            }
          </div>
          <div className='item-card'>
            <img src={item.gallery[this.state.currantImage]} className={`img-fluid ${item.inStock ? '' : 'unavailable'}`} />
            {!this.state.inStock &&
              <div className='unavailable-label'>OUT OF STOCK</div>
            }
          </div>
          <div className='item-info'>
            <div className='info-heading'>
              <div className='heading-main'>
                {item.name.split(" ")[0]}
              </div>
              {item.name.split(" ").length > 1 &&
                <div className='heading-seconadry'>
                  {item.name.substr(item.name.indexOf(" ") + 1)}
                </div>
              }
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
                                <div key={item.id}>
                                  <input name={attribute.name} type="radio" id={`${attribute.name} ${index}`} value={item.value} className='input-size input-hidden' onChange={this.handleInputChange} />
                                  <label htmlFor={`${attribute.name} ${index}`} className={`attribute-value ${attribute.name}`}>{item.displayValue}</label>
                                </div>
                              )
                              break;
                            case "Color":
                              return (
                                <div key={item.id}>
                                  <input name={attribute.name} type="radio" id={`${attribute.name} ${index}`} value={item.value} className='input-color input-hidden' onChange={this.handleInputChange} />
                                  <label htmlFor={`${attribute.name} ${index}`} className={`attribute-value ${attribute.name}`} style={{ backgroundColor: item.value }}></label>
                                </div>
                              )
                              break;
                            default:
                              return (
                                <div key={item.id}>
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
            <button className='add-to-cart-button' disabled={!this.state.inStock}>
              ADD TO CART
            </button>
            <div className='item-description' dangerouslySetInnerHTML={{ __html: item.description }}></div>
          </div>
        </form>
      </main>
    )
  }
}

export default withRouter(PDP)