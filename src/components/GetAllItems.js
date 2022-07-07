import React, { Component } from 'react'
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import Items from './Items';


const POSTS_ITEMS = gql`
query items {
    category{
      name
      products{
        id
        name
        gallery
        prices{
          currency{
            symbol
          }
          amount
        }
        inStock
      }
    }
  }
`;


export class GetAllItems extends Component {
    render() {
        return (
            <Query query={POSTS_ITEMS}>
                {({ loading, error, data }) => {
                    if (loading) console.log('aaaa');
                    if (error) return <p>Error :(</p>;
                    return data
                }}
            </Query>
        )
    }
}

export default GetAllItems