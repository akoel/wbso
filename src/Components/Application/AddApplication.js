import React, {Component} from 'react';
import uuid from 'uuid';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

class AddApplication extends Component {
  constructor(){
    super();
    this.state = {
      newApplication: {},
      isOpen: false,
      isSubOpen: false
    }
  }
  static defaultProps = {
    categories: ['In aanvraag', 'Goedgekeurd', 'Afgekeurd']
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
    if(this.refs.title.value === ''){
      alert('Een naam is vereist');
    } else {
      this.setState({ newProject: {
        id: uuid.v4(),
        title: this.refs.title.value,
        status: this.refs.category.value
      }}, function(){
        console.log(this.state);
        this.props.addProject(this.state.newProject);
      });
    }
    e.preventDefault();
  }

  render() {
    let categoryOptions = this.props.categories.map(category => {
      return <option key={category} value={category}>{category}</option>
    });
    return (
      <div>
        <button className='btn btn-success pull-right' onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></button>
        <Modal isOpen={this.state.isOpen} size='modal-lg' onRequestHide={this.hideModal}>
          <ModalHeader>
            <ModalClose onClick={this.hideModal}/>
            <ModalTitle>Voeg project toe</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div>
                <label>Naam</label><br />
                <input type="text" ref="title" />
              </div>
              <div>
                <label>Status</label><br />
                <select ref="category">
                  {categoryOptions}
                </select>
              </div>
              <button className='btn btn-success' type="submit" value="Indienen">
                <span className="glyphicon glyphicon-ok"></span> Indienen
              </button>
            </form>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-default' onClick={this.hideModal}>
              <span className="glyphicon glyphicon-remove"></span> Annuleren
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddApplication;
