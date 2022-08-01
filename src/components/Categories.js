import React, { Component } from 'react'
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import withRouter from './withRouter';
import { Link } from 'react-router-dom';

const POSTS_CATEGORIES = gql`
query categoties {
    categories{
			name
    }
}
`;

export class Categories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // activeTab: this.props.params.location.state.currentCategory
            activeTab: "all"
        }
    }


    static getDerivedStateFromProps(state) {
        if (state.params.location.state === null) {
            return{
                activeTab:"all"
            }
        } else {
            return{
                activeTab: state.params.location.state.currentCategory
            }
        }
    }

    changeCategory(name) {
        this.setState({ activeTab: name })
    }

    render() {
        return (
            <Query query={POSTS_CATEGORIES}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;
                    return (
                        <ul className='nav'>
                            {
                                data.categories.map((category) => {
                                    return (
                                        <li key={category.name} className={`${category.name === this.state.activeTab ? 'active' : ''}`} >
                                            <Link to={`/${category.name}`} state={{ currentCategory: category.name }} onClick={() => this.changeCategory(category.name)}>
                                                {category.name.toUpperCase()}
                                            </Link>
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

export default withRouter(Categories)