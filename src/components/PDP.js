import React, { Component } from 'react'
import withRouter from './withRouter';
import { Query } from '@apollo/client/react/components';
import Form from './Form';
import {POST_ITEM_PDP} from '../queries/item-pdp-query.js'

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