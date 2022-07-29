import React, { Component } from 'react'
import Item from './Item'
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import withRouter from './withRouter';

// const POSTS_ITEMS = gql`
// query items ($name: String){
//     category (name: $name){
//       name
//       products{
//         id
//         name
//         gallery
//         category
//         brand
//         prices{
//           currency{
//             symbol
//           }
//           amount
//         }
//         attributes{
//             id
//             name
//             type
//             items{
//               displayValue
//               id
//               value
//             }
//         }
//         inStock
//         brand
//         description
//       }
//     }
//   }
// `;

const POST_ITEM_CATEGORY = gql`
  query items($category: CategoryInput!) {
    category(input:$category) {
      name
      products {
        id
        name
        brand
        gallery
        inStock
        prices{
          currency{
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;


//filter for categories
const filter = (data, filter) => (filter === "all") ? (data.category.products) : (data.category.products.filter((item) => item.category === filter))


export class Items extends Component {
  render() {
    // const name = this.props.params.params.category
    // console.log(name)
    const category = {"title": this.props.params.params.category}
    return (
      <main className='category'>
        <div className='row heading'>
          {this.props.category.toUpperCase()}
        </div>
        <div className='catalogue'>
          <Query query={POST_ITEM_CATEGORY} variables={{ category }}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;
              // const items = filter(data, this.props.category)
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