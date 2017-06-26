import React, { Component } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';
import InlineEdit from 'react-edit-inline';
import Api from '../../Utils/Api';

class EmployeeItem extends Component {
  constructor(){
    super();
    this.state = {
      newEmployee: {},
      isOpen: false,
      isSubOpen: false,
      field_voornaam: '',
      field_achternaam: '',
      field_burgerservicenummer: '',
      field_functie: '',
      field_referentie_entiteit: '',
      field_referentie_entiteit_nid: '',
    }
  }

  componentWillMount(){
    this.setState({
      email: this.props.employee.email,
      field_voornaam: this.props.employee.field_voornaam,
      field_achternaam: this.props.employee.field_achternaam,
      field_burgerservicenummer: this.props.employee.field_burgerservicenummer,
      field_functie: this.props.employee.field_functie,
      field_referentie_entiteit: this.props.employee.field_referentie_entiteit,
      field_referentie_entiteit_nid: this.props.employee.field_referentie_entiteit_nid,
    })
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

  voornaamChanged = (data) => {
    this.setState({
      field_voornaam: data.field_voornaam,
    });
  }

  achternaamChanged = (data) => {
    this.setState({
      field_achternaam: data.field_achternaam,
    });
  }

  emailChanged = (data) => {
    this.setState({
      email: data.email,
    });
  }

  bsnChanged = (data) => {
    this.setState({
      field_burgerservicenummer: data.field_burgerservicenummer,
    });
  }

  functieChanged = (data) => {
    this.setState({
      field_functie: data.field_functie,
    });
  }

  entiteitChanged(){
    this.setState({
      field_referentie_entiteit: this.refs.entity_picker_employee.value,
    });
  }

  handleSubmit = (Uid) => {
    this.setState({ newEmployee: {
      name: this.state.email,
      mail: this.state.email,
      pass: "wachtwoord",
      pass2: "wachtwoord",
      field_voornaam: {und:[{value:this.state.field_voornaam}]},
      field_achternaam: {und:[{value:this.state.field_achternaam}]},
      field_burgerservicenummer: {und:[{value:this.state.field_burgerservicenummer}]},
      field_functie: {und:[{value:this.state.field_functie}]},
      field_referentie_entiteit: {und:[{target_id:this.state.field_referentie_entiteit}]},
    }}, function(){
      Api.putEmployee(this.state.newEmployee, this.props.employee.Uid);
    });
    this.hideModal();
  }

  handleDelete(Uid){
    Api.deleteEmployee(Uid);
    this.hideModal();
  }

  render() {
    let entityPickerEmployee = this.props.entities.map(entity => {
      return <option key={entity.Nid}>{entity.title}</option>
    });
    return (
      <div className="employee">
        <button className="btn btn-default" onClick={this.openModal}><span className="glyphicon glyphicon-user"></span> {this.state.field_voornaam} {this.state.field_achternaam}</button>
        <Modal isOpen={this.state.isOpen} size='modal-lg' onRequestHide={this.hideModal}>
          <ModalHeader>
            <ModalClose onClick={this.hideModal}/>
            <ModalTitle>{this.props.employee.field_voornaam} {this.props.employee.field_achternaam} <span className="badge"><span className="glyphicon glyphicon-pencil" /></span></ModalTitle>
          </ModalHeader>
          <ModalBody>
          <div className="table-responsive">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td>Voornaam:</td>
                  <td>
                    <InlineEdit activeClassName="editing form-control" text={this.state.field_voornaam} paramName="field_voornaam" change={this.voornaamChanged} />
                  </td>
                </tr>
                <tr>
                  <td>Achternaam:</td>
                  <td>
                    <InlineEdit activeClassName="editing form-control" text={this.state.field_achternaam} paramName="field_achternaam" change={this.achternaamChanged} />
                  </td>
                </tr>
                <tr>
                  <td>E-mail:</td>
                  <td>
                    <InlineEdit activeClassName="editing form-control" text={this.state.email} paramName="email" change={this.emailChanged} />
                  </td>
                </tr>
                <tr>
                  <td>Burgerservicenummer:</td>
                  <td>
                    <InlineEdit activeClassName="editing form-control" text={this.state.field_burgerservicenummer} paramName="field_burgerservicenummer" change={this.bsnChanged} />
                  </td>
                </tr>
                <tr>
                  <td>Functie:</td>
                  <td>
                    <InlineEdit activeClassName="editing form-control" text={this.state.field_functie} paramName="field_functie" change={this.functieChanged} />
                  </td>
                </tr>
                <tr>
                  <td>In dienst bij:</td>
                  <td>
                    <select className="form-control" ref="entity_picker_employee" defaultValue={this.state.field_referentie_entiteit} onChange={this.entiteitChanged.bind(this)}>{entityPickerEmployee}</select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={this.handleDelete.bind(this, this.props.employee.Uid)}>
              <span className="glyphicon glyphicon-remove"></span> Verwijderen
            </button>
            <button className='btn btn-default' onClick={this.handleSubmit.bind(this, this.props.employee.Uid)}>
              <span className="glyphicon glyphicon-ok"></span> Opslaan
            </button>
            <button className='btn btn-default' onClick={this.hideModal}>
              <span className="glyphicon glyphicon-remove"></span> Annuleren
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EmployeeItem;
