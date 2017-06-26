import React, { Component } from 'react';
import CircularStatusIndicator from 'react-npm-circular-status-indicator';
import AddCost from '../Cost/AddCost';
import AddExpenditure from '../Expenditure/AddExpenditure';
import ProjectItemEdit from './ProjectItemEdit';
import AddTime from '../Time/AddTime';

class ProjectItem extends Component {
  constructor(){
    super();
    this.state = {
    }
  }

  calculateCostSavingPercentage(){
    let usedCost = this.props.project.field_totaal_kosten;
    let budgetedCost = this.props.project.field_begrote_kosten;
    let costSavingPercentage = Math.round((Number(usedCost) / Number(budgetedCost))*100);
    return costSavingPercentage;
  }

  calculateCostSavingCash(){
    let usedCost = this.props.project.field_totaal_kosten;
    let costSavingCash = Math.round(Number(usedCost)*0.32);
    return costSavingCash;
  }

  calculateExpenditureSavingPercentage(){
    let usedExpenditure = this.props.project.field_totaal_uitgaven;
    let budgetedExpenditure = this.props.project.field_begrote_uitgaven;
    let expenditureSavingPercentage = Math.round((Number(usedExpenditure) / Number(budgetedExpenditure))*100);
    return expenditureSavingPercentage;
  }

  calculateExpenditureSavingCash(){
    let usedExpenditure = this.props.project.field_totaal_uitgaven;
    let expenditureSavingCash = Math.round(Number(usedExpenditure)*0.32);
    return expenditureSavingCash;
  }

  calculateTimeSavingPercentage(){
    let usedTime = this.props.project.field_totaal_uren;
    let budgetedTime = this.props.project.field_begrote_uren;
    let timeSavingPercentage = Math.round((Number(usedTime) / Number(budgetedTime))*100);
    return timeSavingPercentage;
  }

  calculateTimeSavingCash(){
    let usedTime = this.props.project.field_totaal_uren;
    let timeSavingCash = Math.round((Number(usedTime) * 29)*0.32);
    return timeSavingCash;
  }

  calculatePotentialSaving() {
    let budgetedTime = this.props.project.field_begrote_uren;
    let budgetedCost = this.props.project.field_begrote_kosten;
    let budgetedExpenditure = this.props.project.field_begrote_uitgaven;
    let potentialSaving = (((Number(budgetedTime) * 29) + Number(budgetedCost) + Number(budgetedExpenditure)) * 0.32);
    return potentialSaving;
  }

  componentWillMount(){
    this.calculateCostSavingPercentage();
    this.calculateCostSavingCash();
    this.calculateExpenditureSavingPercentage();
    this.calculateExpenditureSavingCash();
    this.calculateTimeSavingPercentage();
    this.calculateTimeSavingCash();
    this.calculatePotentialSaving();
  }

  render() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          {this.props.project.title}
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-md-3">
              <div className="well">
                <table className="table">
                  <tbody>
                    <tr>
                      <td><label>Begrote kosten:</label></td><td>{this.props.project.field_begrote_kosten}</td>
                    </tr>
                    <tr>
                      <td><label>Begrote manuren:</label></td><td>{this.props.project.field_begrote_uren}</td>
                    </tr>
                    <tr>
                      <td><label>Begrote uitgaven:</label></td><td>{this.props.project.field_begrote_uitgaven}</td>
                    </tr>
                    <tr>
                      <td><label>Potentiele besparing loonheffing:</label></td><td>{this.calculatePotentialSaving()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-3">
              <div className="panel panel-default">
                <div className="panel-heading">Status uren <span className="badge">{this.props.project.field_totaal_uren}</span></div>
                <div className="panel-body">
                  <CircularStatusIndicator textLabel={this.calculateTimeSavingCash()}>{this.calculateTimeSavingPercentage()}</CircularStatusIndicator>
                  <AddTime project={this.props.project}></AddTime>
                </div>
              </div>
            </div>
            <div className="col-md-3 fill">
              <div className="panel panel-default">
                <div className="panel-heading">Status Kosten <span className="badge">{this.props.project.field_totaal_kosten}</span></div>
                <div className="panel-body">
                  <CircularStatusIndicator textLabel={this.calculateCostSavingCash()}>{this.calculateCostSavingPercentage()}</CircularStatusIndicator>
                  <AddCost project={this.props.project}></AddCost>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="panel panel-default fill">
                <div className="panel-heading">Status uitgaven <span className="badge">{this.props.project.field_totaal_uitgaven}</span></div>
                <div className="panel-body">
                  <CircularStatusIndicator textLabel={this.calculateExpenditureSavingCash()}>{this.calculateExpenditureSavingPercentage()}</CircularStatusIndicator>
                  <AddExpenditure project={this.props.project}></AddExpenditure>
                </div>
              </div>
            </div>
          </div>
          <button className="btn btn-primary pull-left margin-button" type="button">Startdatum WBSO: <span className="badge">{this.props.project.field_geplande_startdatum}</span></button>
          <button className="btn btn-warning pull-left margin-button" type="button">Geplande einddatum: <span className="badge">{this.props.project.field_geplande_einddatum}</span></button>
          <button className="btn btn-info pull-left margin-button" type="button">Werkelijke kosten: <span className="badge">{this.props.project.field_werkelijke_kosten}</span></button>
          <button className="btn btn-primary pull-left margin-button" type="button">WBSO Goedgekeurd: <span className="badge">{this.props.project.field_wbso_status_ontvangen}</span></button>
          <div className="pull-right"><ProjectItemEdit project={this.props.project} entities={this.props.entities}/></div>
        </div>
      </div>
    );
  }
}

export default ProjectItem;
