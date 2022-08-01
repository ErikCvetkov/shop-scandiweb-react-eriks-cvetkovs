import gql from 'graphql-tag';

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

export {POST_ITEM_CATEGORY};