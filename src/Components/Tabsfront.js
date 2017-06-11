import React, { Component } from 'react';
import Projects from './Project/Projects';
import AddProject from './Project/AddProject';
import Applications from './Application/Applications';
import AddApplication from './Application/AddApplication';
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
          <Projects projects={this.props.projects} />
        </Tab>
        <Tab eventKey={2} title="Aanvragen">
          <AddApplication />
          <Applications applications={this.props.applications} />
        </Tab>
        <Tab eventKey={3} title="Administratie">
          <Applications applications={this.props.applications} />
        </Tab>
      </Tabs>
    );
  }
}

export default Tabsfront;
