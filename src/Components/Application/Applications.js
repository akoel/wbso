import React, { Component } from 'react';
import ApplicationItem from './ApplicationItem';

class Applications extends Component {
  constructor(){
    super();
    this.state = {
    }
  }

  render() {
    let applicationItems;
    if(this.props.applications){
      applicationItems = this.props.applications.map(application => {
        return (
          <ApplicationItem key={application.title} application={application} />
        );
      });
    }
    return (
      <div className="tab-margin">
        {applicationItems}
      </div>
    );
  }
}

export default Applications;
