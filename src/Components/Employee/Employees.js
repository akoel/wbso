import React, { Component } from 'react';
import EmployeeItem from './EmployeeItem';
import Api from '../../Utils/Api'

class Employees extends Component {

  constructor(){
    super();
    this.state = {
      employees: [],
    }
  }

  componentDidMount(){
    Api.getEmployees()
      .then(function(employees){
        this.setState(function(){
          return {
            employees: employees
          }
        })
      }.bind(this));
  }

  render() {
    let employeeItems;
    if(this.state.employees){
      employeeItems = this.state.employees.map(employee => {
        return (
          <EmployeeItem key={employee.name} employee={employee} />
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
