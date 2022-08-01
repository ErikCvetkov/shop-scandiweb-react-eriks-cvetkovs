import { gql } from '@apollo/client';

const POSTS_CURRENCIES = gql`
query currencies {
    currencies {
      label
      symbol
    }
  }
`;

export {POSTS_CURRENCIES};