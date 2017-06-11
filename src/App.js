import React, { Component } from 'react';
import Tabsfront from './Components/Tabsfront';
import Employees from './Components/Employee/Employees';
import AddEmployee from './Components/Employee/AddEmployee';
import Entities from './Components/Entity/Entities';
import AddEntity from './Components/Entity/AddEntity';
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
    }
  }

  componentDidMount(){
    Api.getEntities()
      .then(function(entities){
        this.setState(function(){
          return {
            entities: entities
          }
        })
      }.bind(this));
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
                <Employees />
                <AddEmployee entities={this.state.entities}/>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Entiteiten</h3>
              </div>
              <div className="panel-body">
                <Entities entities={this.state.entities}/>
                <AddEntity />
              </div>
            </div>
          </div>
          <div className="col-md-10">
            <Tabsfront projects={this.state.projects} applications={this.state.applications} entities={this.state.entities}/>
          </div>
        </div>
        <Menu />
      </div>
    );
  }
}

export default App;
