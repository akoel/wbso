import React, {Component} from 'react';
import uuid from 'uuid';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';
import { Tooltip, ButtonToolbar, Button, OverlayTrigger } from 'react-bootstrap';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import axios from 'axios';
import moment from 'moment';
import Api from '../../Utils/Api';

class AddTime extends Component {
  constructor(){
    super();
    this.handleEvent = this.handleEvent.bind(this);
    this.state = {
      newTime: {},
      isOpen: false,
      isSubOpen: false,
      employees: [],
      startDate: moment().subtract(29, 'days'),
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

  openModal = () => {
    this.setState({
      isOpen: true
    });
  };

  hideModal = () => {
    this.setState({
      isOpen: false
    });
  };

  handleEvent(event, picker) {
    this.setState({
      startDate: picker.startDate,
    });
  }

  handleSubmit(e){
    console.log("this submit function started to run");
    this.setState({newTime: {
      type: "daguren",
      language: "und",
      title: uuid.v4(),
      field_referentie_project:{und:[{target_id:this.props.project.title}]},
      field_referentie_medewerker:{und:[{target_id:this.refs.employeePicker.value}]},
      field_datum:{und:[{value:{date:this.state.startDate.format('DD-MM-YYYY')}}]},
      field_aantal_uur:{und:[{value:this.refs.aantal_uur.value}]},
    }}, function(){
      var token = Api.getToken();
      var newTime = this.state.newTime;
      console.log(this.state.newTime);
      axios({
        method: 'post',
        url: '?q=api/node.json',
        headers: {'X-CSRF-Token': token},
        data: newTime,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    });
    e.preventDefault();
  }

  render() {
    let employeePicker = this.state.employees.map(employee => {
      return <option key={employee.name} value={employee.name}>{employee.field_voornaam} {employee.field_achternaam}</option>
    });
    const tooltip = (
      <Tooltip id="tooltip"><strong>Daguren toevoegen</strong> Klik hier om je daguren voor dit WBSO project toe te voegen</Tooltip>
    );
    let label = this.state.startDate.format('DD-MM-YYYY');
    let locale = {
      format: 'DD-MM-YYYY',
      separator: ' - ',
      applyLabel: 'Apply',
      cancelLabel: 'Cancel',
      weekLabel: 'W',
      customRangeLabel: 'Custom Range',
      daysOfWeek: moment.weekdaysMin(),
      monthNames: moment.monthsShort(),
      firstDay: moment.localeData().firstDayOfWeek(),
    };
    return (
      <div>
        <ButtonToolbar>
          <OverlayTrigger placement="left" overlay={tooltip}>
            <button className='btn btn-success pull-right' onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></button>
          </OverlayTrigger>
        </ButtonToolbar>
        <Modal isOpen={this.state.isOpen} size='modal-lg' onRequestHide={this.hideModal}>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <ModalHeader>
              <ModalClose onClick={this.hideModal}/>
              <ModalTitle>WBSO daguren toevoegen</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <div className="table-responsive">
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td><label>Medewerker:</label></td><td><select className="form-control" ref="employee_picker">{employeePicker}</select></td>
                    </tr>
                    <tr>
                      <td><label>Datum:</label></td>
                      <td>
                        <div className="form-group">
                          <DatetimeRangePicker singleDatePicker showDropdowns locale={locale} startDate={this.state.startDate} onEvent={this.handleEvent}>
                            <Button className="selected-date-range-btn form-control">
                              <div className="pull-left">
                                <i className="fa fa-calendar"/>
                                &nbsp;
                                <span>
                                  {label}
                                </span>
                              </div>
                              <div className="pull-right">
                                <i className="fa fa-angle-down"/>
                              </div>
                            </Button>
                          </DatetimeRangePicker>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td><label>Aantal uur:</label></td><td>
                        <div className="input-group">
                          <input type="text" className="form-control" ref="aantal_uur" placeholder="500"></input>
                          <div className="input-group-addon">uur</div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-default" onClick={e=>{e.preventDefault();this.hideModal();}}>
                <span className="glyphicon glyphicon-remove"></span> Annuleren
              </button>
              <button className='btn btn-success' type="submit" value="Indienen">
                <span className="glyphicon glyphicon-ok"></span> Indienen
              </button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}

export default AddTime;
