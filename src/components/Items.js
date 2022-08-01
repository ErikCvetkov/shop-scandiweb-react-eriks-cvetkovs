import React, { Component } from 'react'
import Item from './Item'
import { Query } from '@apollo/client/react/components';
import withRouter from './withRouter';
import {POST_ITEM_CATEGORY} from '../queries/item-query.js'

export class Items extends Component {
  render() {
    const category = {"title": this.props.params.params.category}
    return (
      <main className='category'>
        <div className='row heading'>
          {category.title.toUpperCase()}
        </div>
        <div className='catalogue'>
          <Query query={POST_ITEM_CATEGORY} variables={{ category }}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;
              const items = data.category.products
              return items.map(el => (
                <Item key={el.id} item={el} addItemToOrder={this.props.addItemToOrder} currency={this.props.currency} />
              ));
            }}
          </Query>
        </div>
      </main>
    )
  }
}

export default withRouter(Items)