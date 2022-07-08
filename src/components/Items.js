import React, { Component } from 'react'
import Item from './Item'

export class Items extends Component {
    render() {
        return (
            <main className='category'>
                <div className='row heading'>
                    {this.props.category.toUpperCase()}
                </div>
                <div className='row catalogue'>
                    <Item category={this.props.category}/>
                </div>
            </main>
        )
    }
}

export default Items