import React, {Component} from 'react';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';
import { Tooltip, ButtonToolbar, Button, OverlayTrigger } from 'react-bootstrap';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import moment from 'moment';
import InlineEdit from 'react-edit-inline';
import Api from '../../Utils/Api';

class ExpenditureItem extends Component {
  constructor(){
    super();
    this.state = {
      newExpenditure: {},
      isOpen: false,
      isSubOpen: false,
      startDatePayment: moment().subtract(29, 'days'),
      startDateUse: moment().subtract(29, 'days'),
      factuurbedrag: '0',
      percentage: '0',
      bedrag: '0',
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

  handleEventPayment(event, picker) {
    this.setState({
      startDatePayment: picker.startDate,
    });
  }

  handleEventUse(event, picker) {
    this.setState({
      startDateUse: picker.startDate,
    });
  }

  handleSubmit(e){
    e.preventDefault();
    this.setState({ newExpenditure: {
      node: {
        type: "uitgave",
        language: "und",
        field_referentie_project: {und:[{target_id:this.props.project.title}]},
        field_bedrag: {und:[{value:this.refs.bedrag.value}]},
        field_betaaldatum: {und:[{value:{date:this.state.startDatePayment.format('DD-MM-YYYY')}}]},
        field_datum: {und:[{value:{date:this.state.startDateUse.format('DD-MM-YYYY')}}]},
        field_factuurbedrag:{und:[{value:this.refs.factuurbedrag.value}]},
        field_kenmerk:{und:[{value:this.refs.kenmerk.value}]},
        field_omschrijving:{und:[{value:this.refs.omschrijving.value}]},
        field_percentage:{und:[{value:this.refs.percentage.value}]},
      }
    }}, function(){
      Api.postExpenditure(this.state.newExpenditure);
    });
    this.hideModal();
  }

  handleDelete(Nid){
    Api.deleteProject(Nid);
    this.hideModal();
  }

  render() {
    const tooltip = (
      <Tooltip id="tooltip"><strong>Uitgaven toevoegen</strong> Klik hier om uitgaven aan dit WBSO project toe te voegen</Tooltip>
    );
    let labelPayment = this.state.startDatePayment.format('DD-MM-YYYY');
    let labelUse = this.state.startDateUse.format('DD-MM-YYYY');
    let locale = {
      format: 'DD-MM-YYYY',
      separator: ' - ',
      applyLabel: 'Apply',
      cancelLabel: 'Cancel',
      weekLabel: 'W',
      customRangeLabel: 'Custom Range',
      daysOfWeek: moment.weekdaysMin(),
      monthNames: moment.monthsShort(),
      firstDay: moment.localeData().firstDayOfWeek(),
    };
    return (
      <div>
        <ButtonToolbar>
          <OverlayTrigger placement="left" overlay={tooltip}>
            <button className="btn btn-default pull-right" onClick={this.openModal}><span className="glyphicon glyphicon-pencil"></span> Bewerken</button>
          </OverlayTrigger>
        </ButtonToolbar>
        <Modal isOpen={this.state.isOpen} size='modal-lg' onRequestHide={this.hideModal}>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <ModalHeader>
              <ModalClose onClick={this.hideModal}/>
              <ModalTitle>Een WBSO uitgave toevoegen</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <div className="table-responsive">
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td><label>Factuurbedrag:</label></td><td>
                        <div className="input-group">
                          <div className="input-group-addon">€</div>
                          <input type="text" className="form-control" ref="factuurbedrag" placeholder="Bedrag"></input>
                          <div className="input-group-addon">.00</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td><label>Percentage:</label></td><td>
                        <div className="input-group">
                          <input type="text" className="form-control" ref="percentage" placeholder="Percentage"></input>
                          <div className="input-group-addon">%</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td><label>Bedrag:</label></td><td>
                        <div className="input-group">
                          <div className="input-group-addon">€</div>
                          <input type="text" className="form-control" ref="bedrag" placeholder="Bedrag"></input>
                          <div className="input-group-addon">.00</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td><label>Betaaldatum:</label></td><td>
                        <div className="form-group">
                          <DatetimeRangePicker singleDatePicker showDropdowns locale={locale} startDate={this.state.startDatePayment} onEvent={this.handleEventPayment.bind(this)}>
                            <Button className="selected-date-range-btn form-control">
                              <div className="pull-left">
                                <i className="fa fa-calendar"/>
                                &nbsp;
                                <span>
                                  {labelPayment}
                                </span>
                              </div>
                              <div className="pull-right">
                                <i className="fa fa-angle-down"/>
                              </div>
                            </Button>
                          </DatetimeRangePicker>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td><label>Datum ingebruikname: <span className="badge">Verplicht</span></label></td><td>
                      <div className="form-group">
                        <DatetimeRangePicker singleDatePicker showDropdowns locale={locale} startDate={this.state.startDateUse} onEvent={this.handleEventUse.bind(this)}>
                          <Button className="selected-date-range-btn form-control">
                            <div className="pull-left">
                              <i className="fa fa-calendar"/>
                              &nbsp;
                              <span>
                                {labelUse}
                              </span>
                            </div>
                            <div className="pull-right">
                              <i className="fa fa-angle-down"/>
                            </div>
                          </Button>
                        </DatetimeRangePicker>
                      </div>
                      </td>
                    </tr>
                    <tr>
                      <td><label>Kenmerk:</label></td><td><input type="text" className="form-control" ref="kenmerk" placeholder="Een uniek kenmerk"></input></td>
                    </tr>
                    <tr>
                      <td><label>Omschrijving:</label></td><td><textarea type="text" className="form-control" rows="5" ref="omschrijving" placeholder="Een duidelijke en korte omschrijving van het de kostenpost..."></textarea></td>
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

export default ExpenditureItem;
