import React, { Component } from 'react'
import Item from './Item'
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import withRouter from './withRouter';

const POSTS_ITEMS = gql`
query items {
    category{
      name
      products{
        id
        name
        gallery
        category
        brand
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


//filter for categories
const filter = (data, filter) => (filter === "all") ? (data.category.products) : (data.category.products.filter((item) => item.category === filter))


export class Items extends Component {
    render() {
      console.log(this.props.params.params)
        return (
            <main className='category'>
                <div className='row heading'>
                    {this.props.category.toUpperCase()}
                </div>
                <div className='catalogue'>
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

export default withRouter(Items)