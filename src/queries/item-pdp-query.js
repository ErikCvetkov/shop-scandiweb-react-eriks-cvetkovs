import gql from 'graphql-tag';

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

export {POST_ITEM_PDP};