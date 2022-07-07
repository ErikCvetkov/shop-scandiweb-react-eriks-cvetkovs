import React from "react";
import './App.css';
import Header from "./components/Header";
import Items from "./components/Items";


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      allItems: [],
      currentCategory: "all",
    }
    this.chooseCategory = this.chooseCategory.bind(this)
  }

  render() {
    return (
      <div>
        <Header chooseCategory={this.chooseCategory} />
        <Items category={this.state.currentCategory} />
      </div>
    )
  }

  chooseCategory(category) {
    this.setState({
      currentCategory: category
    })
  }

}

export default App;
