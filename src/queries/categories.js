import { gql } from '@apollo/client';

const POSTS_CATEGORIES = gql`
query categoties {
    categories{
			name
    }
}
`;

export {POSTS_CATEGORIES};