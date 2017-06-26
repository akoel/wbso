import React, {Component} from 'react';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import Api from '../../Utils/Api';

class AddProject extends Component {
  constructor(){
    super();
    this.handleApply = this.handleApply.bind(this);
    this.state = {
      newProject: {},
      isOpen: false,
      isSubOpen: false,
      startDate: moment().subtract(29, 'days'),
      endDate: moment(),
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
      },
      is_checked: false,
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

  handleApply(event, picker) {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate,
    });
  }

  toggleCheckbox(event) {
    let newValue = (this.state.is_checked === "on" || this.state.is_checked === true) ? false : true;
    this.setState({
      is_checked: newValue
    });
  }

  handleSubmit(e){
    let werkelijkeKosten = (this.state.is_checked === false) ? null: true;
    this.setState({newProject: {
      type: "project",
      language: "und",
      title: this.refs.naam.value,
      field_referentie_entiteit:{und:[{target_id:this.refs.entity_picker_project.value}]},
      field_omschrijving_lang:{und:[{value:this.refs.project_omschrijving.value}]},
      field_geplande_startdatum:{und:[{value:{date:this.state.startDate.format('DD-MM-YYYY')}}]},
      field_geplande_einddatum:{und:[{value:{date:this.state.endDate.format('DD-MM-YYYY')}}]},
      field_werkelijke_kosten:{und:werkelijkeKosten},
      field_begrote_kosten:{und:[{value:this.refs.begrote_kosten.value}]},
      field_begrote_uitgaven:{und:[{value:this.refs.begrote_uitgaven.value}]},
      field_begrote_manuren:{und:[{value:this.refs.begrote_uren.value}]},
    }}, function(){
      Api.postProject(this.state.newProject);
    });
    e.preventDefault();
    this.hideModal();
  }

  render() {
    let entityPickerProject = this.props.entities.map(entity => {
      return <option key={entity.Nid}>{entity.title}</option>
    });
    let start = this.state.startDate.format('DD-MM-YYYY');
    let end = this.state.endDate.format('DD-MM-YYYY');
    let label = start + ' - ' + end;
    if (start === end) {
      label = start;
    };
    return (
      <div>
        <button className='btn btn-success tab-margin' onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span> Voeg project toe</button>
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
                      <td><label>Naam:</label></td><td><input className="form-control" type="text" ref="naam" placeholder="Project X"></input></td>
                    </tr>
                    <tr>
                      <td><label>Entiteit: <span className="badge">Verplicht</span></label></td><td><select className="form-control" ref="entity_picker_project">{entityPickerProject}</select></td>
                    </tr>
                    <tr>
                      <td><label>Omschrijving:</label></td><td><textarea className="form-control" type="text" rows="5" ref="project_omschrijving" placeholder="Een duidelijke en korte omschrijving van het project..."></textarea></td>
                    </tr>
                    <tr>
                      <td><label>Start- en einddatum:</label></td>
                      <td>
                        <div className="form-group">
                          <DatetimeRangePicker startDate={this.state.startDate} endDate={this.state.endDate} onApply={this.handleApply}>
                            <div className="input-group">
                              <input type="text" className="form-control" value={label}/>
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
                      <td><label>Werkelijke kosten</label></td><td><input type="checkbox" checked={this.state.is_checked} onChange={this.toggleCheckbox.bind(this)}></input></td>
                    </tr>
                    <tr>
                      <td><label>Begrote kosten:</label></td><td>
                        <div className="input-group">
                          <div className="input-group-addon">€</div>
                          <input type="text" className="form-control" ref="begrote_kosten" placeholder="Bedrag"></input>
                          <div className="input-group-addon">.00</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td><label>Begrote uitgaven:</label></td><td>
                        <div className="input-group">
                          <div className="input-group-addon">€</div>
                          <input type="text" className="form-control" ref="begrote_uitgaven" placeholder="Bedrag"></input>
                          <div className="input-group-addon">.00</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td><label>Begrote uren:</label></td>
                      <td>
                        <div className="input-group">
                          <input type="text" className="form-control" ref="begrote_uren" placeholder="500"></input>
                          <div className="input-group-addon">uur</div>
                        </div>
                      </td>
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

export default AddProject;
