import React, { Component } from 'react'
import Item from './Item'
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';

const POSTS_ITEMS = gql`
query items {
    category{
      name
      products{
        id
        name
        gallery
        category
        prices{
          currency{
            symbol
          }
          amount
        }
        attributes{
            id
            name
            type
            items{
              displayValue
              id
              value
            }
        }
        inStock
        brand
        description
      }
    }
  }
`;

const filter = (data, filter) => (filter === "all") ? (data.category.products) : (data.category.products.filter((item) => item.category === filter))


export class Items extends Component {
    render() {
        return (
            <main className='category'>
                <div className='row heading'>
                    {this.props.category.toUpperCase()}
                </div>
                <div className='row catalogue'>
                    <Query query={POSTS_ITEMS}>
                        {({ loading, error, data }) => {
                            if (loading) return <p>Loading...</p>;
                            if (error) return <p>Error :(</p>;
                            const items = filter(data, this.props.category)
                            return items.map( el => (
                                <Item key={el.id} item={el} addItemToOrder={this.props.addItemToOrder} currency={this.props.currency}/>
                            ));
                        }}
                    </Query>
                </div>
            </main>
        )
    }
}

export default Items