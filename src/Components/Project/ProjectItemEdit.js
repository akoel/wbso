import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';
import InlineEdit from 'react-edit-inline';
import moment from 'moment';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import Api from '../../Utils/Api';

class ProjectItemEdit extends Component {
  constructor(){
    super();
    this.handleApply = this.handleApply.bind(this);
    this.state = {
      isOpen: false,
      isSubOpen: false,
      newProject: {},
      title: '',
      field_referentie_entiteit: '',
      field_omschrijving: '',
      field_begrote_kosten: '',
      field_begrote_uitgaven: '',
      field_begrote_manuren: '',
      field_werkelijke_kosten: '',
      field_wbso_status_ontvangen: '',
      field_geplande_startdatum: '',
      field_geplande_einddatum: '',
      startDate:moment(),
      endDate:moment(),
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
      },
      is_checked_costs: false,
      is_checked_status: false,
    }
  }

  componentWillMount(){
    this.setState({
      title: this.props.project.title,
      field_referentie_entiteit: this.props.project.field_referentie_entiteit,
      field_omschrijving: this.props.project.field_omschrijving,
      field_begrote_kosten: this.props.project.field_begrote_kosten,
      field_begrote_uitgaven: this.props.project.field_begrote_uitgaven,
      field_begrote_uren: this.props.project.field_begrote_uren,
      field_werkelijke_kosten: this.props.project.field_werkelijke_kosten,
      field_wbso_status_ontvangen: this.props.project.field_wbso_status_ontvangen,
      field_geplande_startdatum: moment(this.props.project.field_geplande_startdatum).format('DD-MM-YYYY'),
      field_geplande_einddatum: moment(this.props.project.field_geplande_einddatum).format('DD-MM-YYYY'),
      startDate: moment(this.props.project.field_geplande_startdatum),
      endDate: moment(this.props.project.field_geplande_einddatum),
      is_checked_costs: (this.props.project.field_werkelijke_kosten === 'Nee') ? false: true,
      is_checked_status: (this.props.project.field_wbso_status_ontvangen === 'Nee') ? false: true,
    });
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

  titleChanged(data){
    this.setState({
      title: data.title,
    });
  }

  entiteitChanged(){
    this.setState({
      field_referentie_entiteit: this.refs.entity_picker_project.value,
    });
  }

  omschrijvingChanged(data){
    this.setState({
      field_omschrijving: data.field_omschrijving,
    });
  }

  kostenChanged(data){
    this.setState({
      field_begrote_kosten: data.field_begrote_kosten,
    });
  }

  uitgavenChanged(data){
    this.setState({
      field_begrote_uitgaven: data.field_begrote_uitgaven,
    });
  }

  urenChanged(data){
    this.setState({
      field_begrote_uren: data.field_begrote_uren,
    });
  }

  toggleCheckboxCosts(event) {
    let newValue = (this.state.is_checked_costs === "on" || this.state.is_checked_costs === true) ? false : true;
    this.setState({
      is_checked_costs: newValue
    });
  }

  toggleCheckboxStatus(event) {
    let newValue = (this.state.is_checked_status === "on" || this.state.is_checked_status === true) ? false : true;
    this.setState({
      is_checked_status: newValue
    });
  }

  handleApply(event, picker) {
    this.setState({
      field_geplande_startdatum: picker.startDate.format('DD-MM-YYYY'),
      field_geplande_einddatum: picker.endDate.format('DD-MM-YYYY'),
    });
  }

  handleDelete(Nid){
    Api.deleteProject(Nid);
    this.hideModal();
  }

  handleSubmit(){
    let werkelijkeKosten = (this.state.is_checked_costs === false) ? null: true;
    let wbsoStatus = (this.state.is_checked_status === false) ? null: true;
    this.setState({ newProject: {
       node: {
          nid: this.props.project.Nid,
          title: this.state.title,
          language: "und",
          field_referentie_entiteit: {und:[{target_id:this.state.field_referentie_entiteit}]},
          field_omschrijving_lang:{und:[{value:this.state.field_omschrijving}]},
          field_begrote_kosten:{und:[{value:this.state.field_begrote_kosten}]},
          field_begrote_uitgaven:{und:[{value:this.state.field_begrote_uitgaven}]},
          field_begrote_manuren:{und:[{value:this.state.field_begrote_uren}]},
          field_werkelijke_kosten:{und:werkelijkeKosten},
          field_wbso_status_ontvangen:{und:wbsoStatus},
          field_geplande_startdatum:{und:[{value:{date:this.state.field_geplande_startdatum}}]},
          field_geplande_einddatum:{und:[{value:{date:this.state.field_geplande_einddatum}}]},
        }
    }}, function(){
      Api.putProject(this.state.newProject, this.props.project.Nid);
    });
    this.hideModal();
  }

  render() {
    let entityPickerProject = this.props.entities.map(entity => {
      return <option key={entity.Nid}>{entity.title}</option>
    });
    let start = this.state.field_geplande_startdatum;
    let end = this.state.field_geplande_einddatum;
    let label = start + ' - ' + end;
    if (start === end) {
      label = start;
    };
    return (
      <div className="employee">
        <button className="btn btn-default" onClick={this.openModal}><span className="glyphicon glyphicon-pencil"></span> Bewerken</button>
        <Modal isOpen={this.state.isOpen} size='modal-lg' onRequestHide={this.hideModal}>
          <ModalHeader>
            <ModalClose onClick={this.hideModal}/>
            <ModalTitle>{this.props.project.title} <span className="badge"><span className="glyphicon glyphicon-pencil" /></span></ModalTitle>
          </ModalHeader>
          <ModalBody>
            <div className="table-responsive">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td><label>Projectnaam:</label></td>
                    <td>
                      <InlineEdit activeClassName="editing form-control" text={this.state.title} paramName="title" change={this.titleChanged.bind(this)} />
                    </td>
                  </tr>
                  <tr>
                    <td><label>Entiteit:</label></td>
                    <td>
                      <select className="form-control" ref="entity_picker_project" defaultValue={this.state.field_referentie_entiteit} onChange={this.entiteitChanged.bind(this)}>{entityPickerProject}</select>
                    </td>
                  </tr>
                  <tr>
                    <td><label>Omschrijving:</label></td>
                    <td>
                      <InlineEdit activeClassName="editing form-control" text={this.state.field_omschrijving} paramName="field_omschrijving" change={this.omschrijvingChanged.bind(this)} />
                    </td>
                  </tr>
                  <tr>
                    <td><label>Geplande start- en einddatum:</label></td>
                    <td>
                      <div className="form-group">
                        <DatetimeRangePicker startDate={this.state.startDate} endDate={this.state.endDate} onApply={this.handleApply}>
                          <div className="input-group">
                            <input type="text" className="form-control" value={label} />
                              <span className="input-group-btn">
                                <Button className="default date-range-toggle">
                                  <i className="fa fa-calendar"/>
                                </Button>
                              </span>
                          </div>
                        </DatetimeRangePicker>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td><label>Begrote kosten:</label></td>
                    <td>
                      <InlineEdit activeClassName="editing form-control" text={this.state.field_begrote_kosten} paramName="field_begrote_kosten" change={this.kostenChanged.bind(this)} />
                    </td>
                  </tr>
                  <tr>
                    <td><label>Begrote uitgaven:</label></td>
                    <td>
                      <InlineEdit activeClassName="editing form-control" text={this.state.field_begrote_uitgaven} paramName="field_begrote_uitgaven" change={this.uitgavenChanged.bind(this)} />
                    </td>
                  </tr>
                  <tr>
                    <td><label>Begrote uren:</label></td>
                    <td>
                      <InlineEdit activeClassName="editing form-control" text={this.state.field_begrote_uren} paramName="field_begrote_uren" change={this.urenChanged.bind(this)} />
                    </td>
                  </tr>
                  <tr>
                    <td><label>Werkelijke kosten:{this.state.field_werkelijke_kosten}</label></td>
                    <td>
                      <input type="checkbox" checked={this.state.is_checked_costs} onChange={this.toggleCheckboxCosts.bind(this)}></input>
                    </td>
                  </tr>
                  <tr>
                    <td><label>WBSO status ontvangen:{this.state.field_wbso_status_ontvangen}</label></td>
                    <td>
                      <input type="checkbox" checked={this.state.is_checked_status} onChange={this.toggleCheckboxStatus.bind(this)}></input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={this.handleDelete.bind(this, this.props.project.Nid)}>
              <span className="glyphicon glyphicon-remove"></span> Verwijderen
            </button>
            <button className='btn btn-default' onClick={this.handleSubmit.bind(this, this.props.project.Nid)}>
              <span className="glyphicon glyphicon-ok"></span> Opslaan
            </button>
            <button className='btn btn-default' onClick={e=>{e.preventDefault();this.hideModal();}}>
              <span className="glyphicon glyphicon-remove"></span> Annuleren
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ProjectItemEdit;
