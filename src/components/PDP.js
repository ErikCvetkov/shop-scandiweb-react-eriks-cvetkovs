import React, { Component } from 'react'
import withRouter from './withRouter';
import Price from './Price';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';

const POST_ITEM_PDP = gql`
query item($productId:String!){
	product (id: $productId){
    id
    name
    inStock
    gallery
    description
    attributes{
      name
      type
      items{
        id
        displayValue
        value
      }
    }
    prices{
      currency{
        symbol
      }
      amount
    }
    brand
  }
}
`;

export class PDP extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currantImage: 0,
      attributes: {},
      errorFields: [],
      errorState: false
    }
    this.updateImage = this.updateImage.bind(this)
  }


  updateImage(index) {
    this.setState({ currantImage: index })
  }

  //check if user entered all values for attributes
  checkAttributes() {
    let isValid = true
    let errorFields = []
    if (!this.state.inStock) {
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

  //sumbit item to order
  handleSubmit = (event) => {
    event.preventDefault()
    if (this.checkAttributes()) {
      const orderItem = JSON.parse(JSON.stringify(this.state.item))
      orderItem.attributes.forEach((attribute) => {
        const selectedValue = this.state.attributes[attribute.name]
        attribute.userValue = selectedValue
      })
      this.props.addItemToOrder(orderItem)
    }
  }

  // componentWillMount() {
  //   //if page didnt get info about product via state it will show error 
  //   if (this.props.params.location.state === null) {
  //     this.setState({ errorState: true })
  //   } else {
  //     const item = this.props.params.location.state.item
  //     this.setState({ item: item, inStock: item.inStock }, () => {
  //       this.state.item.attributes.forEach((attribute) => {
  //         this.setState(prevState => ({
  //           attributes: {
  //             ...prevState.attributes,
  //             [attribute.name]: null
  //           }
  //         }))
  //       })
  //     })
  //   }
  // }

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
    const productId = this.props.params.params.id;
    return (
      <Query query={POST_ITEM_PDP} variables={{ productId }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          const item = data.product
          console.log(item)
          return (
            <main className='pdp' key={item.id}>
              {!this.state.errorState ? (
                <form onSubmit={this.handleSubmit} className="row">
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
                                        <div key={item.id}>
                                          <input name={attribute.name} type="radio" id={`${attribute.name} ${index}`} value={item.value} className='input-size input-hidden' onChange={this.handleInputChange} />
                                          <label htmlFor={`${attribute.name} ${index}`} className={`attribute-value ${attribute.name}`}>{item.value}</label>
                                        </div>
                                      )
                                    case "Color":
                                      return (
                                        <div key={item.id}>
                                          <input name={attribute.name} type="radio" id={`${attribute.name} ${index}`} value={item.value} className='input-color input-hidden' onChange={this.handleInputChange} />
                                          <label htmlFor={`${attribute.name} ${index}`} className={`attribute-value ${attribute.name}`} style={{ backgroundColor: item.value }}></label>
                                        </div>
                                      )
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
                    <button className='add-to-cart-button' disabled={!item.inStock}>
                      ADD TO CART
                    </button>
                    <div className='item-description' dangerouslySetInnerHTML={{ __html: item.description }}></div>
                  </div>
                </form>
              ) : (
                <div>
                  Error during stage reading, please go to main page.
                </div>
              )
              }
            </main>
          )
        }}
      </Query>
    )
  }
}

export default withRouter(PDP)