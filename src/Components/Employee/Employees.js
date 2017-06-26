import React, { Component } from 'react';
import EmployeeItem from './EmployeeItem';

class Employees extends Component {

  constructor(){
    super();
    this.state = {
    }
  }

  render() {
    let employeeItems;
    if(this.props.employees){
      employeeItems = this.props.employees.map(employee => {
        return (
          <EmployeeItem key={employee.name} employee={employee} entities={this.props.entities}/>
        );
      });
    }
    return (
      <div className="btn-group" role="group">
        {employeeItems}
      </div>
    );
  }
}

export default Employees;
