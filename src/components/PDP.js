import React, { Component } from 'react'
import withRouter from './withRouter';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import Form from './Form';

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
  render() {
    const productId = this.props.params.params.id;
    return (
      <Query query={POST_ITEM_PDP} variables={{ productId }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          const item = data.product
          return (
            <Form currency={this.props.currency} addItemToOrder={this.props.addItemToOrder} item={item}/>
          )
        }}
      </Query>
    )
  }
}

export default withRouter(PDP)