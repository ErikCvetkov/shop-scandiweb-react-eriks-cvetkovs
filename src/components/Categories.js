import React, { Component } from 'react'
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';


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
            tabs: null,
            activeTab: 'all'
        }
        
    }

    addCategories(data){
        this.state.tabs = data.categories.map((category) => category.name)
    }

    handleClick(event, currentTab){
        event.preventDefault();
        const newTabs = this.state.tabs;
        newTabs.forEach((tab, index) => {
            newTabs[index] = tab === currentTab ? "active" : "inactive"
        });
        this.setState({ tabs: newTabs, activeTab: currentTab });
    }

    navbarTabChange(event,tab){
        this.props.chooseCategory(tab)
        this.handleClick(event,tab)
    }

    render() {
        return (
            <Query query={POSTS_CATEGORIES}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;
                    this.addCategories(data)
                    return (
                        <ul className='nav'>
                            {
                                this.state.tabs.map((tab,index) => {
                                    return (
                                        <li key={index} className={`${tab === this.state.activeTab ? 'active' : ''}`} onClick={ event => this.navbarTabChange(event,tab)}>
                                            {tab.toUpperCase()}
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