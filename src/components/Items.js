import React, { Component } from 'react'
import Item from './Item'

export class Items extends Component {
    render() {
        return (
            <main className='category'>
                <div className='row heading'>
                    Category Name
                </div>
                <div className='row catalogue'>
                    <Item />
                </div>
            </main>
        )
    }
}

export default Items