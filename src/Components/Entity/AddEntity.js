import React, { Component } from 'react';
import axios from 'axios';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';
import Api from '../../Utils/Api';

class AddEntity extends Component {
  constructor(){
    super();
    this.state = {
      newEntity: {},
      isOpen: false,
      isSubOpen: false
    }
  };

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
    this.setState({ newEntity: {
      type: "entiteit",
      language: "und",
      title: this.refs.title.value,
      field_rsin:{und:[{value:this.refs.field_rsin.value}]},
      field_kvk_nummer:{und:[{value:this.refs.field_kvk_nummer.value}]},
    }}, function(){
      var token = Api.getToken();
      var newEntity = this.state.newEntity;
      axios({
        method: 'post',
        url: '?q=api/node.json',
        headers: {'X-CSRF-Token': token},
        data: newEntity,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    });
    e.preventDefault();
    this.hideModal();
  }

  render() {
    return (
      <div>
        <button className='btn btn-success pull-right' onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></button>
        <Modal isOpen={this.state.isOpen} size='modal-lg' onRequestHide={this.hideModal}>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <ModalHeader>
              <ModalClose onClick={this.hideModal}/>
              <ModalTitle>Voeg een WBSO entiteit toe</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <div className="table-responsive">
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td><label>Naam:</label></td><td><input className="form-control" type="text" ref="title" placeholder="Bouw B.V."></input></td>
                    </tr>
                    <tr>
                      <td><label>RSIN:</label></td><td><input className="form-control" type="text" ref="field_rsin" placeholder="12345678"></input></td>
                    </tr>
                    <tr>
                      <td><label>KvK nummer:</label></td><td><input className="form-control" type="text" ref="field_kvk_nummer" placeholder="12345678"></input></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-default' type="button" onClick={e=>{e.preventDefault();this.hideModal();}}>
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

export default AddEntity;
