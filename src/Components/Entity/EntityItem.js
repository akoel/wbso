import React, { Component } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';
import InlineEdit from 'react-edit-inline';
import Api from '../../Utils/Api';

class EntityItem extends Component {
  constructor(){
    super();
    this.titleChanged = this.titleChanged.bind(this);
    this.rsinChanged = this.rsinChanged.bind(this);
    this.kvkChanged = this.kvkChanged.bind(this);
    this.state = {
      isOpen: false,
      isSubOpen: false,
      newEntity: {},
      title: '',
      field_rsin: '',
      field_kvk_nummer: '',
    }
  }

  componentWillMount(){
    this.setState({
      title: this.props.entity.title,
      field_rsin: this.props.entity.field_rsin,
      field_kvk_nummer: this.props.entity.field_kvk_nummer,
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

  titleChanged(data){
    this.setState({
      title: data.title,
    });
  }

  rsinChanged(data){
    this.setState({
      field_rsin: data.field_rsin,
    });
  }

  kvkChanged(data){
    this.setState({
      field_kvk_nummer: data.field_kvk_nummer,
    });
  }

  handleDelete(Nid){
    this.props.onDelete(Nid);
    this.hideModal();
  }

  handleSubmit(){
    this.setState({ newEntity: {
       node: {
          nid: this.props.entity.Nid,
          title: this.state.title,
          language: "und",
          field_rsin:{und:[{value:this.state.field_rsin}]},
          field_kvk_nummer:{und:[{value:this.state.field_kvk_nummer}]},
        }
    }}, function(){
      Api.putEntity(this.state.newEntity, this.props.entity.Nid);
    });
    this.hideModal();
  }

  render() {
    return (
      <div className="employee">
        <button className="btn btn-default" onClick={this.openModal}><span className="glyphicon glyphicon-home"></span> {this.state.title}</button>
        <Modal isOpen={this.state.isOpen} size='modal-lg' onRequestHide={this.hideModal}>
          <ModalHeader>
            <ModalClose onClick={this.hideModal}/>
            <ModalTitle>{this.props.entity.title} <span className="badge"><span className="glyphicon glyphicon-pencil" /></span></ModalTitle>
          </ModalHeader>
          <ModalBody>
            <div className="table-responsive">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td><label>Naam:</label></td>
                    <td>
                      <InlineEdit activeClassName="editing form-control" text={this.state.title} paramName="title" change={this.titleChanged} />
                    </td>
                  </tr>
                  <tr>
                    <td><label>RSIN:</label></td>
                    <td>
                      <InlineEdit activeClassName="editing form-control" text={this.state.field_rsin} paramName="field_rsin" change={this.rsinChanged} />
                    </td>
                  </tr>
                  <tr>
                    <td><label>KvK nummer:</label></td>
                    <td>
                      <InlineEdit activeClassName="editing form-control" text={this.state.field_kvk_nummer} paramName="field_kvk_nummer" change={this.kvkChanged} />
                    </td>
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
              <span className="glyphicon glyphicon-remove"></span> Verwijderen
            </button>
            <button className='btn btn-default' onClick={this.handleSubmit.bind(this, this.props.entity.Nid)}>
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

export default EntityItem;
