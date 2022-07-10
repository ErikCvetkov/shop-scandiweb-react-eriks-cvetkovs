import React, { Component } from 'react'
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';


const POSTS_CURRENCIES = gql`
query currencies {
    currencies {
      label
      symbol
    }
  }
`;

export class Currency extends Component {
    render() {
        return (
            <div className='currency'>
                <span>$</span>
                <svg className='arrow' width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 0.5L4 3.5L7 0.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <Query query={POSTS_CURRENCIES}>
                    {({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error :(</p>;
                        return (
                            <div className='currency-switcher'>
                                {
                                    data.currencies.map(({ symbol, label }) => {
                                        return (
                                            <div key={symbol} className={`currency-option ${symbol === this.props.currency ? 'active' : ''}`} onClick={ () => this.props.chooseCurrency(symbol)}>
                                                {symbol} {label}
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        );
                    }}
                </Query>
            </div>
        )
    }
}

export default Currency