import React from "react";
import './App.css';
import Header from "./components/Header";
import Items from "./components/Items";


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
  }

  render() {
    return (
      <div>
        <Header chooseCategory={this.chooseCategory} orders={this.state.orders} chooseCurrency={this.chooseCurrency} currency={this.state.currentCurrency}/>
        <Items category={this.state.currentCategory} addItemToOrder={this.addItemToOrder} currency={this.state.currentCurrency} />
      </div>
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

  addItemToOrder(item) {
    let isInArray = false
    this.state.orders.forEach(el => {
      if (el.id === item.id) {
        isInArray = true
      }
    })
    if (!isInArray) {
      this.setState({ orders: [...this.state.orders, item] })
    }
  }
}



export default App;
