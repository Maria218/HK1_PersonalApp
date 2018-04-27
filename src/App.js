import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import { NavBar } from './Nav';
import { Pomodoro } from './Pomodoro'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <NavBar /> */}
        <Pomodoro />
      </div>
    );
  }
}

export default App;
