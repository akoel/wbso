import React, {Component} from 'react';
import uuid from 'uuid';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';
import { Button, Tooltip, ButtonToolbar, OverlayTrigger } from 'react-bootstrap';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import moment from 'moment';
import Api from '../../Utils/Api';

class AddCost extends Component {
  constructor(){
    super();
    this.state = {
      newCost: {},
      isOpen: false,
      isSubOpen: false,
      startDatePayment: moment().subtract(29, 'days'),
      startDateUse: moment().subtract(29, 'days'),
      disable: '',
    }
  }

  componentWillMount(){
    this.checkDisable();
  }

  checkDisable(){
    if (this.props.project.field_werkelijke_kosten === 'Nee') {
      this.setState ({
        disable: 'disabled',
      })
    }
  };

  openModal = () => {
    if (this.props.project.field_werkelijke_kosten === 'Ja') {
      this.setState({
        isOpen: true
      });
    }
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
    this.setState({ newCost: {
      type: "kostenpost",
      language: "und",
      title: uuid.v4(),
      field_referentie_project: {und:[{target_id:this.props.project.title}]},
      field_bedrag: {und:[{value:this.refs.bedrag.value}]},
      field_betaaldatum: {und:[{value:{date:this.state.startDatePayment.format('DD-MM-YYYY')}}]},
      field_datum: {und:[{value:{date:this.state.startDateUse.format('DD-MM-YYYY')}}]},
      field_kenmerk:{und:[{value:this.refs.kenmerk.value}]},
      field_omschrijving:{und:[{value:this.refs.omschrijving.value}]},
    }}, function(){
      Api.postCost(this.state.newCost);
    });
    e.preventDefault();
    this.hideModal();
  }

  render() {
    const tooltip = (
      <Tooltip id="tooltip"><strong>Kosten toevoegen</strong> Klik hier om kosten voor dit WBSO project toe te voegen</Tooltip>
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
            <button className={"btn btn-success pull-right " + this.state.disable} onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></button>
          </OverlayTrigger>
        </ButtonToolbar>
        <Modal isOpen={this.state.isOpen} size='modal-lg' onRequestHide={this.hideModal}>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <ModalHeader>
              <ModalClose onClick={this.hideModal}/>
              <ModalTitle>Een WBSO kostenpost toevoegen</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <div className="table-responsive">
                <table className="table table-striped">
                  <tbody>
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
                      <td><label>Datum kosten gemaakt: <span className="badge">Verplicht</span></label></td><td>
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
                      <td><label>Omschrijving:</label></td><td><textarea type="text" className="form-control" rows="5" ref="omschrijving" placeholder="Een duidelijke en korte omschrijving van de kostenpost..."></textarea></td>
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

export default AddCost;
