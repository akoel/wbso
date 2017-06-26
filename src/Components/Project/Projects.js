import React, { Component } from 'react';
import ProjectItem from './ProjectItem';

class Projects extends Component {
  constructor(){
    super();
    this.state = {
    }
  }

  render() {
    let projectItems;
    if(this.props.projects){
      projectItems = this.props.projects.map(project => {
        return (
          <ProjectItem key={project.title} project={project} entities={this.props.entities}/>
        );
      });
    }
    return (
      <div className="tab-margin">
        {projectItems}
      </div>
    );
  }
}

export default Projects;
