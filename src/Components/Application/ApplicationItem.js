import React, { Component } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';
import InlineEdit from 'react-edit-inline';
import Api from '../../Utils/Api';

class ApplicationItem extends Component {
  constructor(){
    super();
    this.titleChanged = this.titleChanged.bind(this);
    this.state = {
      isOpen: false,
      isSubOpen: false,
      newApplication: {},
      title: '',
      field_referentie_entiteit: '',
      field_referenties_projecten: '',
      field_datum: '',
    }
  }

  componentWillMount(){
    this.setState({
      title: this.props.application.title,
      field_referentie_entiteit: this.props.application.field_referentie_entiteit,
      field_referenties_projecten: this.props.application.field_referenties_projecten,
      field_datum: this.props.application.field_datum,
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
  };

  handleDelete(Nid){
    this.props.onDelete(Nid);
    this.hideModal();
  };

  handleSubmit(){
    this.setState({ newApplication: {
       node: {
          nid: this.props.application.nid,
          title: this.state.title,
          language: "und",
        }
    }}, function(){
      Api.putEntity(this.state.newApplication, this.props.application.nid);
    });
    this.hideModal();
  };

  render() {
    return (
      <div className="employee">
        <button className="btn btn-default" onClick={this.openModal}><span className="glyphicon glyphicon-home"></span> {this.state.title}</button>
        <Modal isOpen={this.state.isOpen} size='modal-lg' onRequestHide={this.hideModal}>
          <ModalHeader>
            <ModalClose onClick={this.hideModal}/>
            <ModalTitle>{this.props.application.title} <span className="badge"><span className="glyphicon glyphicon-pencil" /></span></ModalTitle>
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
                </tbody>
              </table>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={this.handleDelete.bind(this, this.props.application.nid)}>
              <span className="glyphicon glyphicon-remove"></span> Verwijderen
            </button>
            <button className='btn btn-default' onClick={this.handleSubmit.bind(this, this.props.application.nid)}>
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

export default ApplicationItem;
