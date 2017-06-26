import React, { Component } from 'react';
import Tabsfront from './Components/Tabsfront';
import Employees from './Components/Employee/Employees';
import AddEmployee from './Components/Employee/AddEmployee';
import Entities from './Components/Entity/Entities';
import AddEntity from './Components/Entity/AddEntity';
import Applications from './Components/Application/Applications';
import AddApplication from './Components/Application/AddApplication';
import Menu from './Components/Menu';
import './App.css';
import Api from './Utils/Api';

class App extends Component {
  constructor(){
    super();
    this.state = {
      projects: [],
      applications: [],
      entities: [],
      employees: [],
    }
  }

  componentWillMount(){
    Api.getProjects()
      .then(function(projects){
        this.setState(function(){
          return {
            projects: projects
          }
        })
      }.bind(this));

    Api.getApplications()
      .then(function(applications){
        this.setState(function(){
          return {
            applications: applications
          }
        })
      }.bind(this));

    Api.getEntities()
      .then(function(entities){
        this.setState(function(){
          return {
            entities: entities
          }
        })
      }.bind(this));

    Api.getEmployees()
      .then(function(employees){
        this.setState(function(){
          return {
            employees: employees
          }
        })
      }.bind(this));
  }

  handleDeleteEntity(Nid){
    Api.deleteEntity(Nid);
  }

  handleDeleteApplication(Nid){
    Api.deleteApplication(Nid);
  }

  render() {
    return (
      <div className="app container-fluid">
        <div className="row container-fluid">
          <nav className="navbar navbar-default navbar-static-top">
            <div className="container-fluid">
              <a className="navbar-brand" href="#"><span className="glyphicon glyphicon-dashboard"></span> WBSO Dashboard</a>
              <label htmlFor="off_canvas" className="navbar-toggle custom1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </label>
            </div>
          </nav>
        </div>
        <div className="row container-fluid">
          <div className="col-md-2">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Werknemers</h3>
              </div>
              <div className="panel-body">
                <Employees employees={this.state.employees} entities={this.state.entities} />
                <AddEmployee entities={this.state.entities} />
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Entiteiten</h3>
              </div>
              <div className="panel-body">
                <Entities entities={this.state.entities} onDelete={this.handleDeleteEntity.bind(this)}/>
                <AddEntity />
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Aanvragen</h3>
              </div>
              <div className="panel-body">
                <Applications applications={this.state.applications} onDelete={this.handleDeleteApplication.bind(this)}/>
                <AddApplication />
              </div>
            </div>
          </div>
          <div className="col-md-10">
            <Tabsfront projects={this.state.projects} entities={this.state.entities} employees={this.state.employees} />
          </div>
        </div>
        <Menu />
      </div>
    );
  }
}

export default App;
