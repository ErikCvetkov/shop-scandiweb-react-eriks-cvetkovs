import React from "react";
import './App.css';
import Header from "./components/Header";
import Items from "./components/Items";
import PDP from "./components/PDP";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


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
      <Router>
        <div>
          <Header chooseCategory={this.chooseCategory} orders={this.state.orders} chooseCurrency={this.chooseCurrency} currency={this.state.currentCurrency} />
        </div>
        <Routes>
          <Route path="/" element={<Items category={this.state.currentCategory} currency={this.state.currentCurrency}/>}/>
          <Route path="/item/:id" element={<PDP addItemToOrder={this.addItemToOrder} currency={this.state.currentCurrency}/>}/>
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
