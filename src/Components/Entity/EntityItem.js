import React, { Component } from 'react';
import axios from 'axios';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';
import Api from '../../Utils/Api';

class EntityItem extends Component {
  constructor(){
    super();
    this.state = {
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

  handleDelete(){
    let token = Api.getToken();
    let nid = this.props.entity.Nid;
    axios({
      method: 'delete',
      url: '?q=api/node/' + nid +'.json',
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
        <button className="btn btn-default" onClick={this.openModal}><span className="glyphicon glyphicon-home"></span> {this.props.entity.title}</button>
        <Modal isOpen={this.state.isOpen} size='modal-lg' onRequestHide={this.hideModal}>
          <ModalHeader>
            <ModalClose onClick={this.hideModal}/>
            <ModalTitle>{this.props.entity.title}</ModalTitle>
          </ModalHeader>
          <ModalBody>
          <div className="table-responsive">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td>Naam:</td><td>{this.props.entity.title}</td>
                </tr>
                <tr>
                  <td>RSIN:</td><td>{this.props.entity.field_rsin}</td>
                </tr>
                <tr>
                  <td>KvK nummer:</td><td>{this.props.entity.field_kvk_nummer}</td>
                </tr>
                <tr>
                  <td>Medewerkers:</td><td>{this.props.entity.field_referenties_werknemers}</td>
                </tr>
              </tbody>
            </table>
          </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={this.handleDelete.bind(this, this.props.entity.Nid)}>
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

export default EntityItem;
