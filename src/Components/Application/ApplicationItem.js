import React, { Component } from 'react';

class ApplicationItem extends Component {
  deleteApplication(id){
    this.props.onDelete(id);
  }

  render() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          {this.props.application.title}
        </div>
        <div className="panel-body">
          {this.props.application.field_referentie_entiteit}
          {this.props.application.field_referenties_projecten}
          {this.props.application.field_indiendatum}
        <button className="btn btn-danger pull-right"  onClick={this.deleteApplication.bind(this, this.props.application.id)}><span className="glyphicon glyphicon-remove"></span></button>
        </div>
      </div>
    );
  }
}

export default ApplicationItem;
