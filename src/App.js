import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import { NavBar } from './Nav';
import { Pomodoro } from './Pomodoro';

// if(process.env.NODE_ENV !== 'production') {
// React.Perf = require('react-addons-perf');
// }

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <NavBar /> */}
        <Pomodoro />
        <br />
        <ol>
          <li>Decide on the task to be done</li>
          <li>Start the timer</li>
          <li>Work on the task</li>
          <li>Stop your work when the alarm sounds or when you get the notification</li>
          <li>Take a 5 minute break, then continue your work</li>
          <li>After 4 pomodoros have been done, take a longer break of 15 minutes</li>
        </ol>
      </div>
    );
  }
}

export default App;
