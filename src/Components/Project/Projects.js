import React, { Component } from 'react';
import ProjectItem from './ProjectItem';
import Api from '../../Utils/Api';

class Projects extends Component {
  constructor(){
    super();
    this.state = {
      projects: [],
    }
  }

  componentDidMount(){
    Api.getProjects()
      .then(function(projects){
        this.setState(function(){
          return {
            projects: projects
          }
        })
      }.bind(this));
  }

  deleteProject(){
  }

  render() {
    let projectItems;
    if(this.state.projects){
      projectItems = this.state.projects.map(project => {
        return (
          <ProjectItem key={project.title} project={project} />
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
