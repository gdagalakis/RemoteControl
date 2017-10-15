import React, { Component } from 'react';
import './style.css';
//const devices=['coffe Machine', 'Alarm Clock', 'Television'];

class DeviceList extends Component{
  render() {
    return(       
      <div className="deviceList">
        <ul>
          {this.props.devices.map( (item,index) => {
            return (
              <li key={index}>{item}
              <button onClick={this.props.delHand(index)}> del </button>
              <button onClick={this.props.editHand(index)}> edit </button>
              </li>
              );
            }
          ) }
        </ul>  
      </div>
    )
  }

}


export default DeviceList;
