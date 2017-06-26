import React, {Component} from 'react';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';
import { Tooltip, ButtonToolbar, Button, OverlayTrigger } from 'react-bootstrap';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import moment from 'moment';
import InlineEdit from 'react-edit-inline';
import Api from '../../Utils/Api';

class TimeItem extends Component {
  constructor(){
    super();
    this.handleEvent = this.handleEvent.bind(this);
    this.state = {
      newTime: {},
      employees: [],
      projects: [],
      isOpen: false,
      isSubOpen: false,
      nid: '',
      startDate: moment(),
      field_referentie_project_nid: '',
      field_referentie_medewerker_uid: '',
      field_referentie_project: '',
      field_referentie_medewerker: '',
      field_aantal_uur: '',
      voornaam: '',
      achternaam: '',
    }
  }

  componentWillMount(){
    Api.getEmployees()
      .then(function(employees){
        this.setState(function(){
          return {
            employees: employees
          }
        })
      }.bind(this));

    Api.getProjects()
      .then(function(projects){
        this.setState(function(){
          return {
            projects: projects
          }
        })
      }.bind(this));

    Api.getTimeItem(this.props.nid)
      .then(function(timeItem){
        this.setState(function(){
          return {
            nid: timeItem.nid,
            field_referentie_medewerker_uid: Api.getEmployeeItem(timeItem.field_referentie_medewerker.und.map(array=>array.target_id))
              .then(function(employeeItem){
                this.setState(function(){
                  return {
                    voornaam: employeeItem.field_voornaam.und.map(array=>array.value).toString(),
                    achternaam: employeeItem.field_achternaam.und.map(array=>array.value).toString(),
                  }
                })
              }.bind(this)),
            field_referentie_project_nid: timeItem.field_referentie_project.und.map(array=>array.target_id),
            field_datum: moment(timeItem.field_datum.und.map(array=>array.value).toString()).format('DD-MM-YYYY'),
            startDate: moment(timeItem.field_datum.und.map(array=>array.value).toString()),
            field_aantal_uur: timeItem.field_aantal_uur.und.map(array=>array.value).toString(),
          }
        })
      }.bind(this));
  }

  componentDidMount(){
    Api.getProjectItem(this.state.field_referentie_project_nid)
      .then(function(projectItem){
        this.setState(function(){
          return {
            field_referentie_project: projectItem.title,
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

  projectChanged(){
    this.setState({
      field_referentie_project: this.refs.project_picker.value,
    });
  }

  medewerkerChanged(){
    this.setState({
      field_referentie_medewerker: this.refs.employee_picker.value,
    });
  }

  urenChanged(data){
    this.setState({
      field_aantal_uur: data.field_aantal_uur,
    })
  }

  handleEvent(event, picker) {
    this.setState({
      startDate: picker.startDate,
    });
  }

  handleSubmit(e){
    this.setState({ newTime: {
      node: {
        type: "daguren",
        language: "und",
        field_referentie_project: {und:[{target_id:this.props.project.title}]},
        field_referentie_medewerker: {und:[{target_id:this.refs.employee_picker.value}]},
        field_datum: {und:[{value:{date:this.state.startDate.format('DD-MM-YYYY')}}]},
        field_aantal_uur: {und:[{value:this.refs.aantal_uur.value}]},
      }
    }}, function(){
      Api.postTime(this.state.newTime);
    });
    e.preventDefault();
    this.hideModal();
  }

  handleDelete(Nid){
    Api.deleteTimeItem(Nid);
    this.hideModal();
  }

  render() {
    let employeePicker = this.state.employees.map(employee => {
      return <option key={employee.uid} value={employee.uid}>{employee.field_voornaam} {employee.field_achternaam}</option>
    });
    let projectPicker = this.state.projects.map(project => {
      return <option key={project.nid} value={project.nid}>{project.title}</option>
    });
    const tooltip = (
      <Tooltip id="tooltip"><strong>Daguren bewerken</strong> Klik hier om deze daguren te bewerken</Tooltip>
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
    let voornaam = this.state.voornaam;
    let achternaam = this.state.achternaam;
    let defaultValueEmployee = voornaam +' '+ achternaam;
    console.log(defaultValueEmployee);
    return (
      <div>
        <ButtonToolbar>
          <OverlayTrigger placement="left" overlay={tooltip}>
            <button className='btn btn-default pull-right' onClick={this.openModal}><span className="glyphicon glyphicon-pencil"></span> Bewerken</button>
          </OverlayTrigger>
        </ButtonToolbar>
        <Modal isOpen={this.state.isOpen} size='modal-lg' onRequestHide={this.hideModal}>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <ModalHeader>
              <ModalClose onClick={this.hideModal}/>
              <ModalTitle>WBSO daguren bewerken</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <div className="table-responsive">
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td><label>Project:</label></td>
                        <td><select className="form-control" ref="project_picker" defaultValue={this.state.field_referentie_project} onChange={this.projectChanged.bind(this)}>{projectPicker}</select>
                      </td>
                    </tr>
                    <tr>
                      <td><label>Medewerker:</label></td>
                        <td><select className="form-control" ref="employee_picker" defaultValue={this.state.field_referentie_medewerker_uid} onChange={this.medewerkerChanged.bind(this)}>{employeePicker}</select>
                      </td>
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
                      <td><label>Aantal uur:</label></td>
                      <td>
                        <InlineEdit activeClassName="editing form-control" text={this.state.field_aantal_uur} paramName="field_aantal_uur" change={this.urenChanged.bind(this)} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={this.handleDelete.bind(this, this.state.nid)}>
                <span className="glyphicon glyphicon-remove"></span> Verwijderen
              </button>
              <button className='btn btn-default' onClick={this.handleSubmit.bind(this, this.state.nid)}>
                <span className="glyphicon glyphicon-ok"></span> Opslaan
              </button>
              <button className='btn btn-default' onClick={e=>{e.preventDefault();this.hideModal();}}>
                <span className="glyphicon glyphicon-remove"></span> Annuleren
              </button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}

export default TimeItem;
