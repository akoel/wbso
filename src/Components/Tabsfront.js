import React, { Component } from 'react';
import Projects from './Project/Projects';
import AddProject from './Project/AddProject';
import BigCalendar from './BigCalendar';
import { Tabs, Tab } from 'react-bootstrap';

class Tabsfront extends Component {
  constructor(){
    super();
    this.state = {
      eventKey: 1,
    }
  }

  handleSelect(key) {
    this.setState({key});
  }

  render() {
    return (
      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
        <Tab eventKey={1} title="Projecten">
          <AddProject entities={this.props.entities} />
          <Projects projects={this.props.projects} entities={this.props.entities} />
        </Tab>
        <Tab eventKey={2} title="Administratie">
          <BigCalendar projects={this.props.projects} employees={this.props.employees} />
        </Tab>
      </Tabs>
    );
  }
}

export default Tabsfront;
