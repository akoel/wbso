import React, { Component } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';
import Api from '../../Utils/Api';

class AddEmployee extends Component {
  constructor(){
    super();
    this.state = {
      newEmployee: {},
      isOpen: false,
      isSubOpen: false,
    }
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

  handleSubmit(e){
    this.setState({ newEmployee: {
      name: this.refs.email.value,
      mail: this.refs.email.value,
      pass: "wachtwoord",
      pass2: "wachtwoord",
      status: "1",
      roles:["4"],
      field_voornaam: {und:[{value:this.refs.voornaam.value}]},
      field_achternaam: {und:[{value:this.refs.achternaam.value}]},
      field_burgerservicenummer: {und:[{value:this.refs.burgerservicenummer.value}]},
      field_functie: {und:[{value:this.refs.functie.value}]},
      field_referentie_entiteit: {und:[{target_id:this.refs.entity_picker_employee.value}]},
    }}, function(){
      Api.postEmployee(this.state.newEmployee);
    });
    e.preventDefault();
    this.hideModal();
  }

  render() {
    let entityPickerEmployee = this.props.entities.map(entity => {
      return <option key={entity.Nid}>{entity.title}</option>
    });
    return (
      <div>
        <button className='btn btn-success pull-right' onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></button>
        <Modal isOpen={this.state.isOpen} size='modal-lg' onRequestHide={this.hideModal}>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <ModalHeader>
              <ModalClose onClick={this.hideModal}/>
              <ModalTitle>Voeg een WBSO medewerker toe</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <div className="table-responsive">
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td><label>Voornaam:</label></td><td><input className="form-control" type="text" ref="voornaam" placeholder="Benjamin"></input></td>
                    </tr>
                    <tr>
                      <td><label>Achternaam:</label></td><td><input className="form-control" type="text" ref="achternaam" placeholder="Van den Broek"></input></td>
                    </tr>
                    <tr>
                      <td><label>E-mail: <span className="badge">Verplicht</span></label></td><td><input className="form-control" type="text" ref="email" placeholder="naam@provider.nl"></input></td>
                    </tr>
                    <tr>
                      <td><label>Burgerservicenummer:</label></td><td><input className="form-control" type="text" ref="burgerservicenummer" placeholder="12345678"></input></td>
                    </tr>
                    <tr>
                      <td><label>Functie:</label></td><td><input className="form-control" type="text" ref="functie" placeholder="Accountmanager"></input></td>
                    </tr>
                    <tr>
                      <td><label>In dienst bij: <span className="badge">Verplicht</span></label></td><td><select className="form-control" ref="entity_picker_employee">{entityPickerEmployee}</select></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-default' onClick={e=>{e.preventDefault();this.hideModal()}}>
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

export default AddEmployee;
