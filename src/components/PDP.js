import React, { Component } from 'react'
import withRouter from './withRouter';
import Price from './Price';

export class PDP extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currantImage: 0
    }
    this.updateImage = this.updateImage.bind(this)
  }

  updateImage(index){
    this.setState({currantImage:index})
  }


  render() {
    const item = this.props.params.location.state.item
    console.log(item)
    return (
      <main className='pdp'>
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
          <img src={item.gallery[this.state.currantImage]} className="img-fluid" />
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
                    {attribute.name}:
                  </div>
                  <div className='attribute-values'>
                    {
                      attribute.items.map((item) => {
                        return (
                          <div className={`attribute-value ${attribute.name}`} key={item.id}>
                            {item.displayValue}
                          </div>
                        )
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
              <Price currency={this.props.currency} item={item}/>
            </div>
          </div>
          <div className='add-to-cart-button'>
            ADD TO CART
          </div>
          <div className='item-description' dangerouslySetInnerHTML={{ __html: item.description }}></div>
        </div>
      </main>
    )
  }
}

export default withRouter(PDP)