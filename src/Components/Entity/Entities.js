import React, { Component } from 'react';
import EntityItem from './EntityItem';

class Entities extends Component {
  handleDelete(Nid){
    this.props.onDelete(Nid);
  }

  render() {
    let entityItems;
    if(this.props.entities){
      entityItems = this.props.entities.map(entity => {
        return (
          <EntityItem key={entity.title} entity={entity} onDelete={this.handleDelete.bind(this)} />
        );
      });
    }
    return (
      <div className="btn-group" role="group">
        {entityItems}
      </div>
    );
  }
}

export default Entities;
