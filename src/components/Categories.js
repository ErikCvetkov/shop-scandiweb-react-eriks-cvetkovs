import React, { Component } from 'react'
import { useQuery, gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';

const POSTS_CATEGORIES = gql`
query categoties {
    categories{
			name
    }
}
`;

export class Categories extends Component {
    render() {
        return (
            <Query query={POSTS_CATEGORIES}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;
                    return (
                        <ul className='nav'>
                            {
                                data.categories.map(({ name }) => {
                                    return (
                                        <li key={name} onClick={() => this.props.chooseCategory(name)}>
                                            {name.toUpperCase()}
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    );
                }}
            </Query>
        )
    }
}

export default Categories