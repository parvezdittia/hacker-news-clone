import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    let counter = this.state.counter;
    this.setState({
      counter: counter + 1,
    });
  }

  render() {
    return (
      <>
        <p>React Hydration</p>
        <p>Counter: {this.state.counter}</p>
        <button onClick={this.incrementCounter}> Counter Click</button>
      </>
    );
  }
}

export default App;
