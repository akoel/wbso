import React, { Component } from 'react';

class Menu extends Component {

  render() {
    return (
      <div className="off-canvas">
        <input type="checkbox" id="off_canvas" />
        <div className="cstm-shade">
          <div className="cstm-navi">
            <div className="cstm-navi-content">
              <a href="https://mijn.rvo.nl" target="_blank">
                <img className="row" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Logo_RDO.svg/266px-Logo_RDO.svg.png" alt="RvO logo" />
              </a>
              <br />
              <div className="well tab-margin">
                <strong>WBSO Dashboard</strong><br />
                <p>Met deze App kan een WBSO administratie worden bijgehouden</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
