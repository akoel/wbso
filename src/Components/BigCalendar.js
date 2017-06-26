import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import styles from 'react-big-calendar/lib/css/react-big-calendar.css';
import Api from '../Utils/Api';
import CostItem from './Cost/CostItem';
import ExpenditureItem from './Expenditure/ExpenditureItem';
import TimeItem from './Time/TimeItem';

BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  constructor(){
    super();
    this.state = {
      events: [],
    }
  }

  componentWillMount(){
    Api.getCalendar()
      .then(function(response){
        response.map((event) => {
          this.state.events.push({
            start: new Date(event.start),
            end: new Date(event.end),
            title: event.title,
            project: event.project,
            uren: event.uren,
            nid: event.nid,
            bedrag: event.bedrag,
          })
        });
      }.bind(this));
  }

  render(){
    function MyEvent({event}){
      if(event.title === 'Uitgave'){
        return <span><em>{event.title}</em> - {event.project}</span>
      } else if (event.title === 'Kostenpost'){
        return <span><em>{event.title}</em> - {event.project}</span>
      } else {
        return <span><em>{event.title}</em> - {event.project} ({event.uren})</span>
      }
    }

    function MyAgendaEvent({event}) {
      if(event.title === 'Uitgave'){
        return <div className="row bg-warning">
            <div className="col-md-3">{event.title}</div>
            <div className="col-md-3">{event.project}</div>
            <div className="col-md-3">{event.bedrag}</div>
            <div className="col-md-3"><ExpenditureItem nid={event.nid} /></div>
          </div>
      } else if (event.title === 'Kostenpost'){
        return <div className="row bg-info">
            <div className="col-md-3">{event.title}</div>
            <div className="col-md-3">{event.project}</div>
            <div className="col-md-3">{event.bedrag}</div>
            <div className="col-md-3"><CostItem nid={event.nid} /></div>
          </div>
      } else {
        return <div className="row bg-success">
            <div className="col-md-3">{event.title}</div>
            <div className="col-md-3">{event.project}</div>
            <div className="col-md-3">{event.uren} uur</div>
            <div className="col-md-3"><TimeItem nid={event.nid} /></div>
          </div>
      }
    }
    let formats = {
      dateFormat: 'DD-MM-YYYY',
      agendaDateFormat: 'DD-MM-YYYY',
    }
    let components = {
      event: MyEvent,
      agenda: {
        event: MyAgendaEvent,
      }
    }
    return (
      <div>
        <BigCalendar
          events={this.state.events}
          toolbar={true}
          views={['month', 'agenda']}
          defaultView='month'
          selectable={true}
          step={30}
          popup={true}
          formats={formats}
          components={components}
        />
      </div>
    )
  }
}

export default Calendar;
