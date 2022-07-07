import React from "react";
import './App.css';
import Header from "./components/Header";
import Items from "./components/Items";
import { useQuery, gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      allItems: [],
      currentCategory: "all",
    }
    this.state.currentCategory = this.chooseCategory.bind(this)
  }
  render() {
    return (
      <div>
        <Header chooseCategory={this.chooseCategory}/>
        <Items/>
      </div>
    )
  }


  chooseCategory(category) {
    console.log(category)
    return category;
  }

}

export default App;
