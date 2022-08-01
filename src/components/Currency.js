import React, { Component } from 'react'
import { Query } from '@apollo/client/react/components';
import {POSTS_CURRENCIES} from '../queries/currencies-query.js'

export class Currency extends Component {
    constructor(props) {
        super(props)
        this.box = React.createRef();
    }

    render() {
        return (
            <div className="currency" ref={this.box}>
                <div className='w-100' onClick={() => {
                    this.props.getActiveElement(this.props.id,this.box)
                }
                }>
                    <span>{this.props.currency}</span>
                    <svg className={`arrow${this.props.activeElement === this.props.id ? ' up' : ''}`} width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 0.5L4 3.5L7 0.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className='currency-switcher'>
                    {this.props.activeElement === this.props.id &&
                        <Query query={POSTS_CURRENCIES}>
                            {({ loading, error, data }) => {
                                if (loading) return <p>Loading...</p>;
                                if (error) return <p>Error :(</p>;
                                return (
                                    <div>
                                        {
                                            data.currencies.map(({ symbol, label }) => {
                                                return (
                                                    <div key={symbol} className={`currency-option ${symbol === this.props.currency ? 'active' : ''}`} onClick={() => {
                                                        this.props.chooseCurrency(symbol)
                                                        this.props.getActiveElement(null,null)
                                                    }
                                                    }>
                                                        {symbol} {label} {this.props.message}
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                );
                            }}
                        </Query>
                    }
                </div>
            </div >
        )
    }
}

export default Currency