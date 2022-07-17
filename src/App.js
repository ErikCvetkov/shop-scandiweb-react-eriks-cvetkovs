import React from "react";
import './App.css';
import Header from "./components/Header";
import Items from "./components/Items";
import PDP from "./components/PDP";
import CartOverview from "./components/CartOverview"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      currentCategory: "all",
      currentCurrency: "$",
    }
    this.chooseCategory = this.chooseCategory.bind(this)
    this.addItemToOrder = this.addItemToOrder.bind(this)
    this.chooseCurrency = this.chooseCurrency.bind(this)
    this.updateOrderCount = this.updateOrderCount.bind(this)
    this.totalSum = this.totalSum.bind(this)
    this.getCount = this.getCount.bind(this)
  }

  componentWillMount(){
    localStorage.getItem('orders') && this.setState({
      orders: JSON.parse(localStorage.getItem('orders')),
    })
    localStorage.getItem('currentCurrency') && this.setState({
      currentCurrency: JSON.parse(localStorage.getItem('currentCurrency')),
    })
  }

  componentWillUpdate(nextProps,nextState){
    localStorage.setItem('orders', JSON.stringify(nextState.orders))
    localStorage.setItem('currentCurrency', JSON.stringify(nextState.currentCurrency))
  }

  render() {
    return (
      <Router>
        <div>
          <Header getCount={this.getCount} totalSum={this.totalSum} updateOrderCount={this.updateOrderCount} chooseCategory={this.chooseCategory} orders={this.state.orders} chooseCurrency={this.chooseCurrency} currency={this.state.currentCurrency} />
        </div>
        <Routes>
          <Route path="/" element={<Items addItemToOrder={this.addItemToOrder} category={this.state.currentCategory} currency={this.state.currentCurrency} />} />
          <Route path="/item/:id" element={<PDP addItemToOrder={this.addItemToOrder} currency={this.state.currentCurrency} />} />
          <Route path="/cart" element={<CartOverview getCount={this.getCount} totalSum={this.totalSum} updateOrderCount={this.updateOrderCount} orders={this.state.orders} currency={this.state.currentCurrency} />} />
        </Routes>
      </Router>
    )
  }
  chooseCategory(category) {
    this.setState({
      currentCategory: category
    })
  }

  chooseCurrency(currency) {
    this.setState({
      currentCurrency: currency
    })
  }

  itemIsInArray(item, array) {
    let isInArray = false
    let itemIndex = null
    array.forEach((el, index) => {
      let similarAttrs = 0
      if (item.name === el.name) {
        el.attributes.forEach((attribute) => {
          if (attribute.userValue === item.attributes.find(element => element.name === attribute.name).userValue) {
            similarAttrs++
          }
        })
        if (similarAttrs === el.attributes.length) {
          isInArray = true
          itemIndex = index
        }
      }
    })
    return [isInArray, itemIndex]
  }


  addItemToOrder(item) {
    let isInArray = this.itemIsInArray(item, this.state.orders)
    if (!isInArray[0]) {
      const order = JSON.parse(JSON.stringify(item))
      order.count = 1
      this.setState({ orders: [...this.state.orders, order] })
    } else {
      let orders = this.state.orders
      let order = orders[isInArray[1]]
      order.count = ++order.count
      orders[isInArray[1]] = order
      this.setState({ orders: orders })
    }
  }

  updateOrderCount(index, move) {
    let orders = this.state.orders
    let order = orders[index]
    if (move) {
      order.count = ++order.count
    } else {
      order.count = --order.count
    }
    if (order.count < 1) {
      orders.splice(index, 1)
      this.setState({ orders: orders })
    } else {
      orders[index] = order
      this.setState({ orders: orders })
    }
  }

  totalSum(){
    let orders = this.state.orders
    let totalSum = 0
    orders.forEach((product) => {
      product.prices.forEach((price) => {
        if (price.currency.symbol === this.state.currentCurrency) {
          totalSum = totalSum + price.amount * product.count
        }
      })
    })
    return totalSum.toFixed(2) + ' ' + this.state.currentCurrency
  }

  getCount(){
    let orders = this.state.orders
    let count = 0
    if (orders !== null) {
        orders.forEach((item) => {
            count += item.count
        })
        return count
    }
}
}



export default App;
