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
            activeTab: 'all'
        }
    }

    handleClick(event, currentTab){
        this.setState({ activeTab: currentTab });
    }

   // change active category
    navbarTabChange(event,tab){
        this.handleClick(event,tab)
        this.props.chooseCategory(tab)
         //whenever user clicks on categories, app return items componen
        this.props.params.navigate("/")
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
                                        // <li key={category.name} className={`${category.name === this.state.activeTab ? 'active' : ''}`} onClick={ event => this.navbarTabChange(event,category.name)}>
                                        <li key={category.name} className={`${category.name === this.state.activeTab ? 'active' : ''}`}>
                                            <Link to={`/${category.name}`} state={{ currentCategory: category.name }}>
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