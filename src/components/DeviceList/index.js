import React, { Component } from 'react';
import './style.css';
//const devices=['coffe Machine', 'Alarm Clock', 'Television'];

class DeviceList extends Component{
  render() {
    const dev=this.props.devices;
    return(       
      <div className="deviceList">
        <ul>
          
          {dev.map( function(item,index){
            return <li key={index}>{item}</li>;
            }
          ) }
        </ul>  
      </div>
    )
  }

}


export default DeviceList;
