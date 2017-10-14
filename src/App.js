import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DeviceList from './components/DeviceList';
import 'normalize.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      devices:['coffe Machine', 'Alarm Clock', 'Television'],
      inputText:''
    }
  }

  clickHandler = (text) => () => {
    this.setState({
      devices: this.state.devices.concat([text]),
      inputText: ""
    })
  }
  
  onChangeHandler = (event) => {
    this.setState({inputText:event.target.value})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="text" value={this.state.inputText} onChange={this.onChangeHandler}/>
        <button onClick={this.clickHandler(this.state.inputText)}>
        push
        </button>
        <DeviceList devices={this.state.devices} />
        
      </div>
    );
  }
}

export default App;
