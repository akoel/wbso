import React, { Component } from 'react';
import CircularStatusIndicator from 'react-npm-circular-status-indicator';

class StatusCircle extends Component {
  constructor(){
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <CircularStatusIndicator textLabel={'Default'}>80</CircularStatusIndicator>
      </div>
    );
  }
}

export default StatusCircle;
