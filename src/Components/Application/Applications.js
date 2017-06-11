import React, { Component } from 'react';
import ApplicationItem from './ApplicationItem';
import Api from '../../Utils/Api';

class Applications extends Component {
  constructor(){
    super();
    this.state = {
      applications: [],
    }
  }

  componentDidMount(){
    Api.getApplications()
      .then(function(applications){
        this.setState(function(){
          return {
            applications: applications
          }
        })
      }.bind(this));
  }

  render() {
    let applicationItems;
    if(this.state.applications){
      applicationItems = this.state.applications.map(application => {
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
