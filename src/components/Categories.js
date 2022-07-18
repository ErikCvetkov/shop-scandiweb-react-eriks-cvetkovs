import React, { Component } from 'react'
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import withRouter from './withRouter';


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
                                        <li key={category.name} className={`${category.name === this.state.activeTab ? 'active' : ''}`} onClick={ event => this.navbarTabChange(event,category.name)}>
                                            {category.name.toUpperCase()}
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