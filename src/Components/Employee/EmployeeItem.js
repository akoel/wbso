import React, { Component } from 'react';
import axios from 'axios';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';
import Api from '../../Utils/Api';

class EmployeeItem extends Component {
  constructor(){
    super();
    this.state = {
      isOpen: false,
      isSubOpen: false
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

  openSubModal = () => {
    this.setState({
      isSubOpen: true
    });
  };

  hideSubModal = () => {
    this.setState({
      isSubOpen: false
    });
  };

  handleDelete(){
    let token = Api.getToken();
    let uid = this.props.employee.Uid;
    axios({
      method: 'delete',
      url: '?q=api/user/' + uid +'.json',
      headers: {'X-CSRF-Token': token},
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    this.hideModal();
  }

  render() {
    return (
      <div className="employee">
        <button className="btn btn-default" onClick={this.openModal}><span className="glyphicon glyphicon-user"></span> {this.props.employee.field_voornaam} {this.props.employee.field_achternaam}</button>
        <Modal isOpen={this.state.isOpen} size='modal-lg' onRequestHide={this.hideModal}>
          <ModalHeader>
            <ModalClose onClick={this.hideModal}/>
            <ModalTitle>{this.props.employee.field_voornaam} {this.props.employee.field_achternaam}</ModalTitle>
          </ModalHeader>
          <ModalBody>
          <div className="table-responsive">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td>Voornaam:</td><td>{this.props.employee.field_voornaam}</td>
                </tr>
                <tr>
                  <td>Achternaam:</td><td>{this.props.employee.field_achternaam}</td>
                </tr>
                <tr>
                  <td>Burgerservicenummer:</td><td>{this.props.employee.field_burgerservicenummer}</td>
                </tr>
                <tr>
                  <td>Functie:</td><td>{this.props.employee.field_functie}</td>
                </tr>
                <tr>
                  <td>In dienst bij:</td><td>{this.props.employee.field_referentie_entiteit}</td>
                </tr>
              </tbody>
            </table>
          </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={this.handleDelete.bind(this, this.props.employee.Uid)}>
              <span className="glyphicon glyphicon-remove"></span>
            </button>
            <button className='btn btn-default' onClick={this.hideModal}>
              <span className="glyphicon glyphicon-pencil"></span> Bewerken
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
