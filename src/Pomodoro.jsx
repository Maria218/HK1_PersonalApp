import React, { Component } from 'react';
import alert from './alarm.mp3';

export class Pomodoro extends Component {
  constructor() {
    super();
    this.state = {
      time: 0,
      play: false,
      timeType: 0,
      title: ''
    };
    // Binding
    this.setTimeForCode = this.setTime.bind(this, 1500);
    this.setTimeForSocial = this.setTime.bind(this, 300);
    this.setTimeForCoffee = this.setTime.bind(this, 900);
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
    this.elapseTime = this.elapseTime.bind(this);
  }

  componentDidMount() {
    this.setDefaultTime();
    Notification.requestPermission();
  }

  elapseTime() {
    if (this.state.time === 0) {
      this.pause(0);
      this.alert();
    }
    if (this.state.play === true) {
      let newState = this.state.time - 1;
      this.setState({time: newState});
    }
  }

  format(seconds) {
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 3600 % 60);
    let timeFormated = `${m < 10 ? "0" : ""}${m} : ${s < 10 ? "0" : ""}${s}`
    return timeFormated;
  }

  getFormatTypes() {
    return [
      {type: "code", time: 1500},
      {type: "social", time: 300},
      {type: "coffee", time: 900}
    ];
  }

  formatType(timeType) {
    let timeTypes = this.getFormatTypes();
    for(let i=0; i<timeTypes.length; i++) {
      let timeObj = timeTypes[i];
      if(timeObj.time === timeType) {
        return timeObj.type;
      }
    }
    return null;
  }

  restartInterval() {
    clearInterval(this.interval);
    this.interval = setInterval(this.elapseTime, 1000);
  }

  play() {
    if (true === this.state.play) return;
    this.restartInterval();
    this.setState({
      play: true
    });
  }

  pause(pauseFor = this.state.time) {
    clearInterval(this.interval);
    let time = this.format(pauseFor);
    this.setState({play: false});
  }

  togglePlay() {
    if (true === this.state.play){
      return this.pause();
    }
    return this.play();
  }

  setTime(newTime) {
    this.restartInterval();
    this.setState({
      time: newTime,
      timeType: newTime,
      play: false
    });
  }

  setDefaultTime() {
    let defaultTime = 1500;
    this.setState({
      time: defaultTime,
      timeType: defaultTime,
      play: false
    });
  }

  toggleMode(gotoDirection) {
    let timeTypes = this.getFormatTypes();
    let currentPosition = -1;
    for (let i = 0; i < timeTypes.length; i++) {
      if (timeTypes[i].time === this.state.timeType) {
        currentPosition = i;
        break;
      };
    };

    if (currentPosition !== -1) {
      let newMode = timeTypes[currentPosition + gotoDirection];
      if (newMode) this.setTime(newMode.time);
    };
  }

  _setLocalStorage (item, element) {
    let value = element.target.checked;
    localStorage.setItem('react-pomodoro-' + item, value);
  }

  _getLocalStorage (item) {
    return (localStorage.getItem('react-pomodoro-' + item) == 'true') ? true : false;
  }

  alert() {
    // audio
    if(this.refs.audio.checked) {
      let audio = new Audio(alert);
      audio.play();
      // setTimeout(()=> audio.pause(), 1400);
    }
    // notification
    if(this.refs.notification.checked) {
      if (this.state.timeType === 1500) {
        let notification = new Notification("Relax :)", {
          icon: "coffee.png",
          body: "Go talk or drink a coffee."
        });
      } else {
        let notification = new Notification("The time is over!", {
          icon: "code.png",
          body: "Hey, back to work!"
        });
      }
    }
  }

  render() {
    return (
      <div className="pomodoro">
        {/* Main section
        ------------------------------- */}
        <div className="main">

          <div className="container display timer">
            <span className="time">{this.format(this.state.time)}</span>
            <span className="timeType">The {this.formatType(this.state.timeType)} time!</span>
          </div>

          <div className="container display types">
            <button className="btn start" onClick={this.setTimeForCode}>Code</button>
            <button className="btn social" onClick={this.setTimeForSocial}>Social</button>
            <button className="btn coffee" onClick={this.setTimeForCoffee}>Coffee</button>
          </div>

          <div className="container">
            <div className="controlsPlay">
              <button className="play btnIcon" onClick={this.play}></button>
              <button className="pause btnIcon" onClick={this.pause}></button>
            </div>
          </div>

        </div> {/* main */}

        {/* Bottom section
        ------------------------------- */}
        <div>

          <div className="controls">
            <div className="container">

              <div className="controlsLink">
                <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank">What is Pomodoro?</a>
              </div>

              <div className="controlsCheck">
                <span className="check">
                  <input
                    type="checkbox"
                    ref="notification"
                    id="notification"
                    defaultChecked={this._getLocalStorage('notification')}
                    onChange={this._setLocalStorage.bind(this, 'notification')}
                  />
                  <label htmlFor="notification"></label>
                  <span className="checkTitle" >Notification</span>
                </span>
                <span className="check">
                  <input
                    type="checkbox"
                    ref="audio"
                    id="audio"
                    defaultChecked={this._getLocalStorage('audio')}
                    onChange={this._setLocalStorage.bind(this, 'audio')}
                  />
                  <label htmlFor="audio"></label>
                  <span className="checkTitle">Sound</span>
                </span>
              </div> {/* controlsCheck */}
            </div> {/* container */}
          </div> {/* controls */}
        </div> {/* bottomBar */}
      </div> /* bottomBar */
    );
  }
};
