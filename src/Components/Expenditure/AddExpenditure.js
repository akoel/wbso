import React, {Component} from 'react';
import uuid from 'uuid';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';
import { Tooltip, ButtonToolbar, OverlayTrigger } from 'react-bootstrap';
import SingleDatePicker from '../SingleDatePicker';

class AddExpenditure extends Component {
  constructor(){
    super();
    this.state = {
      newProject: {},
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
    const tooltip = (
      <Tooltip id="tooltip"><strong>Uitgaven toevoegen</strong> Klik hier om uitgaven aan dit WBSO project toe te voegen</Tooltip>
    );
    return (
      <div>
        <ButtonToolbar>
          <OverlayTrigger placement="left" overlay={tooltip}>
            <button className='btn btn-success pull-right' onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></button>
          </OverlayTrigger>
        </ButtonToolbar>
        <Modal isOpen={this.state.isOpen} size='modal-lg' onRequestHide={this.hideModal}>
          <ModalHeader>
            <ModalClose onClick={this.hideModal}/>
            <ModalTitle>Een WBSO uitgave toevoegen</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <div className="table-responsive">
              <form onSubmit={this.handleSubmit.bind(this)}>
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td><label>Factuurbedrag:</label></td><td>
                        <div className="input-group">
                          <div className="input-group-addon">€</div>
                          <input type="text" className="form-control" ref="uitgave_factuurbedrag" placeholder="Bedrag"></input>
                          <div className="input-group-addon">.00</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td><label>Percentage:</label></td><td>
                        <div className="input-group">
                          <input type="text" className="form-control" ref="percentage_factuurbedrag" placeholder="70"></input>
                          <div className="input-group-addon">%</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td><label>Bedrag:</label></td><td>
                        <div className="input-group">
                          <div className="input-group-addon">€</div>
                          <input type="text" className="form-control" ref="uitgave_bedrag" placeholder="Bedrag"></input>
                          <div className="input-group-addon">.00</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td><label>Betaaldatum:</label></td><td>
                        <SingleDatePicker />
                      </td>
                    </tr>
                    <tr>
                      <td><label>Datum ingebruikname:</label></td><td>
                        <SingleDatePicker />
                      </td>
                    </tr>
                    <tr>
                      <td><label>Kenmerk:</label></td><td><input type="text" ref="betaaldatum" placeholder="Een uniek kenmerk"></input></td>
                    </tr>
                    <tr>
                      <td><label>Omschrijving:</label></td><td><textarea type="text" rows="5" ref="omschrijving" placeholder="Een duidelijke en korte omschrijving van het de kostenpost..."></textarea></td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-default' onClick={this.hideModal}>
              <span className="glyphicon glyphicon-remove"></span> Annuleren
            </button>
            <button className='btn btn-success' type="submit" value="Indienen">
              <span className="glyphicon glyphicon-ok"></span> Indienen
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddExpenditure;
