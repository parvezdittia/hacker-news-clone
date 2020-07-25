import React, { Component } from "react";
import Header from "./Header/Header";
import Content from "./Content/Content";
import Chart from "./Chart/Chart";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Header></Header>
        <Content news={this.props.news}></Content>
        <Chart></Chart>
      </>
    );
  }
}

export default App;
