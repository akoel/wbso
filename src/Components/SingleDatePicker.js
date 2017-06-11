import React, { Component } from 'react';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import moment from 'moment';
import { Button } from 'react-bootstrap';

class SingleDatePicker extends Component {

  constructor(props) {
    super(props);

    this.handleEvent = this.handleEvent.bind(this);

    this.state = {
      startDate: moment().subtract(29, 'days'),
    };
  }

  handleEvent(event, picker) {
    this.setState({
      startDate: picker.startDate,
    });
  }

  render() {
    let label = this.state.startDate.format('DD-MM-YYYY');

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
      <div className="form-group">
        <DatetimeRangePicker singleDatePicker showDropdowns locale={locale} startDate={this.state.startDate} onEvent={this.handleEvent}>
          <Button className="selected-date-range-btn form-control">
            <div className="pull-left">
              <i className="fa fa-calendar"/>
              &nbsp;
              <span>
                {label}
              </span>
            </div>
            <div className="pull-right">
              <i className="fa fa-angle-down"/>
            </div>
          </Button>
        </DatetimeRangePicker>
      </div>
    );
  }

}

export default SingleDatePicker;
