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
    }
    this.chooseCategory = this.chooseCategory.bind(this)
    this.addItemToOrder = this.addItemToOrder.bind(this)
  }

  render() {
    return (
      <div>
        <Header chooseCategory={this.chooseCategory} orders={this.state.orders}/>
        <Items category={this.state.currentCategory} addItemToOrder={this.addItemToOrder} />
      </div>
    )
  }

  chooseCategory(category) {
    this.setState({
      currentCategory: category
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
      this.setState({ orders: [...this.state.orders, item] }, () => {
        console.log(this.state.orders)
      })
    }
  }
}



export default App;
